import React, { useState, useRef } from "react";

// Tesseract.js의 WorkerOptions 타입을 확장합니다.

interface ImageToTextProps {
  setText: (text: string) => void;
}

const ImageToText = ({ setText }: ImageToTextProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string>("");
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 이미지 전처리 함수
  const processImage = (image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const brightness = 35;
    const contrast = 1.7;

    for (let i = 0; i < data.length; i += 4) {
      let avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      avg = (avg - 128) * contrast + 128;
      avg += brightness;
      avg = Math.max(0, Math.min(255, avg));
      data[i] = data[i + 1] = data[i + 2] = avg;
    }

    ctx.putImageData(imageData, 0, 0);

    const processedImageUrl = canvas.toDataURL("image/png");
    setProcessedImage(processedImageUrl);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);

        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          processImage(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtractText = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const imageDataUrl = canvas.toDataURL("image/png");
    const base64Image = imageDataUrl.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      "",
    );

    // Tesseract.js를 사용하여 선택된 영역의 텍스트만 추출
    const apiKey = "AIzaSyDapu8iTty2V_6E7Kk70KohQE0j2vcb0M8"; // 여기에 Google Vision API 키를 입력하세요
    const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestPayload = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: "TEXT_DETECTION",
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(visionApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      const result = await response.json();
      const extractedText = result.responses[0].fullTextAnnotation
        ? result.responses[0].fullTextAnnotation.text
        : "No text found";

      setResultText(extractedText);
    } catch (error) {
      console.error("Error fetching Vision API:", error);
      setText("텍스트 추출 실패");
    }
  };
  return (
    <div className="img-to-text">
      <div className="d-flex">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleExtractText}>텍스트 추출</button>
      </div>

      <div className="d-flex flex-column">
        {selectedImage && (
          <>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </>
        )}

        {processedImage && (
          <div>
            <h4>전처리된 이미지 미리보기</h4>
            <img
              src={processedImage}
              alt="Processed"
              style={{
                maxWidth: "100%",
                height: "auto",
                border: "1px solid red",
              }}
            />
          </div>
        )}

        <textarea
          value={resultText}
          readOnly
          style={{ width: "100%", height: "200px", marginTop: "20px" }}
        />
      </div>
      {/* 전처리된 이미지 미리보기 */}
    </div>
  );
};

export default ImageToText;
