import React, { useState, useRef, useEffect } from "react";
import Tesseract, { WorkerOptions } from "tesseract.js";

// Tesseract.js의 WorkerOptions 타입을 확장합니다.
interface ExtendedWorkerOptions extends WorkerOptions {
  tessedit_char_whitelist?: string;
  tessedit_pageseg_mode?: Tesseract.PSM;
  preserve_interword_spaces?: string;
}

interface ImageToTextProps {
  setText: (text: string) => void;
}
const ImageToText = ({ setText }: ImageToTextProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [selection, setSelection] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const wordDictionary: { [key: string]: string } = {
    속노: "속도",
    고: "7",
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 캔버스 크기에 맞춰 이미지 그리기
    ctx.drawImage(image, 0, 0, image.width, image.height);
  };

  const drawSelection = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 선택 영역을 캔버스 기준으로 설정
    setSelection({ x, y, width: 0, height: 0 });
    setIsSelecting(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSelecting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSelection((prev) => ({
      ...prev,
      width: x - prev.x,
      height: y - prev.y,
    }));

    drawImage();
    drawSelection();
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const handleExtractText = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 선택된 영역의 이미지 데이터만 가져옴
    const { width, height } = selection;
    if (width === 0 || height === 0) {
      alert("텍스트를 추출할 영역을 선택해 주세요.");
      return;
    }
    const imageData = ctx.getImageData(
      selection.x,
      selection.y,
      selection.width,
      selection.height,
    );

    // 선택된 영역만 포함하는 새 캔버스 생성
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = selection.width;
    tempCanvas.height = selection.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.putImageData(imageData, 0, 0);

    // 이미지 전처리
    const processedCanvas = preprocessImage(tempCanvas);

    // Tesseract.js를 사용하여 선택된 영역의 텍스트만 추출
    const options: Partial<ExtendedWorkerOptions> = {
      logger: (m) => setProgress(Math.floor(m.progress * 100)),
      // tessedit_char_whitelist: "0123456789%가-힣",
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      preserve_interword_spaces: "1",
    };

    Tesseract.recognize(processedCanvas, "kor", options)
      .then(({ data: { text } }) => {
        // 한글, 숫자, 퍼센트 기호만 남기고 나머지는 모두 제거
        let cleanedText = text.replace(/[^가-힣0-9%]/g, "").trim();

        Object.keys(wordDictionary).forEach((key) => {
          const regex = new RegExp(key, "g");
          cleanedText = cleanedText.replace(regex, wordDictionary[key]);
        });

        // 96을 %로 변경 (앞에 숫자가 있는 경우만)
        cleanedText = cleanedText.replace(/(\d)96/g, "$1%");

        // '%'를 잘못 인식한 경우 수정 (3자리 숫자 + 9%인 경우만)
        cleanedText = cleanedText.replace(/(\d{2})9%/g, "$1%");

        cleanedText = cleanedText.replace(/(\d{2})9/g, "$1%");

        // 각 항목을 분리
        const items =
          cleanedText.match(/[가-힣]+\d+%?|[가-힣]+의세트\d*/g) || [];

        // 후처리: '장비점수' 제거, '의세트' 뒤의 숫자 제거
        const processedItems = items.reduce((acc, item) => {
          if (!item.startsWith("장비점수")) {
            if (item.includes("의세트")) {
              const [set] = item.split("의세트");
              acc.push(set);
            } else {
              acc.push(item.replace("수", ""));
            }
          }
          return acc;
        }, [] as string[]);

        const formattedText = processedItems.join(",");

        setText(formattedText);
      })
      .catch((err) => {
        console.error(err);
        setText("텍스트 추출 실패");
      });
  };

  const preprocessImage = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    // 원본 이미지 데이터 가져오기
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 대비 및 밝기 조정 파라미터
    const contrast = 1.2; // 대비 증가 (1보다 크면 대비 증가)
    const brightness = 25; // 밝기 증가 (양수면 밝아짐, 음수면 어두워짐)

    // 흑백 변환 및 대비/밝기 조정
    for (let i = 0; i < data.length; i += 4) {
      // 흑백 변환
      let avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

      // 대비 조정
      avg = ((avg / 255 - 0.5) * contrast + 0.5) * 255;

      // 밝기 조정
      avg += brightness;

      // 값 범위 제한 (0-255)
      avg = Math.max(0, Math.min(255, avg));

      data[i] = avg; // Red
      data[i + 1] = avg; // Green
      data[i + 2] = avg; // Blue
    }

    // 확대 비율 설정 (예: 2배)
    const scale = 2;

    // 확대된 크기의 새 캔버스 생성
    const enlargedCanvas = document.createElement("canvas");
    enlargedCanvas.width = canvas.width * scale;
    enlargedCanvas.height = canvas.height * scale;
    const enlargedCtx = enlargedCanvas.getContext("2d");

    if (enlargedCtx) {
      // 이미지 스무딩 비활성화 (픽셀화 방지)
      enlargedCtx.imageSmoothingEnabled = false;

      // 흑백 변환된 이미지를 확대하여 그리기
      enlargedCtx.putImageData(imageData, 0, 0);
      enlargedCtx.drawImage(
        enlargedCanvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        enlargedCanvas.width,
        enlargedCanvas.height,
      );
    }

    return enlargedCanvas;
  };

  useEffect(() => {
    if (selectedImage && canvasRef.current && imageRef.current) {
      const img = imageRef.current;
      console.log(img.width);
      console.log(img.width);
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        drawImage();
        drawSelection();
      };
      img.src = selectedImage;
    }
  }, [selectedImage]);

  return (
    <div>
      <div className="d-flex">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleExtractText}>텍스트 추출</button>
        <div>진행률: {progress}%</div>
      </div>

      {selectedImage && (
        <div>
          <img
            ref={imageRef}
            src={selectedImage}
            alt="Uploaded"
            style={{ visibility: "hidden", width: "100%" }}
          />
          <canvas
            ref={canvasRef}
            style={{ border: "1px solid black", width: "100%", height: "auto" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      )}
    </div>
  );
};

export default ImageToText;
