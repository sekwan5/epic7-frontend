import React, { useState, useRef } from "react";

// Tesseract.js의 WorkerOptions 타입을 확장합니다.
export interface IParseData {
  parsedData: {
    key: string;
    value: string;
  }[];
  set: string | null;
}
interface ImageToTextProps {
  setParseData: (item: IParseData) => void;
}

export function ImageToText({ setParseData }: ImageToTextProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const visionApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

    const brightnessThreshold = 100; // 이 값 이하의 밝기는 제거

    for (let i = 0; i < data.length; i += 4) {
      // RGB 값을 평균하여 밝기 계산
      const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

      // 밝기가 threshold 이하인 경우 픽셀을 완전히 투명하게 설정
      if (avg < brightnessThreshold) {
        data[i + 3] = 0; // Alpha 값을 0으로 설정하여 픽셀을 투명하게 만듦
      }
    }

    ctx.putImageData(imageData, 0, 0);
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

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  type ParsedData = {
    key: string;
    value: string;
  };

  type Result = {
    parsedData: ParsedData[];
    set: string | null;
  };

  function parseEquipmentData(dataList: string[]): Result {
    const parsedData: ParsedData[] = [];
    let setInfo: string | null = null;
    const validKeys = [
      "생명력",
      "방어력",
      "속도",
      "치명확률",
      "치명피해",
      "공격력",
      "효과저항",
      "효과적중",
      "속도",
    ];

    for (let i = 0; i < dataList.length; i++) {
      const currentKey = dataList[i].replace(/[^가-힣a-zA-Z0-9%]/g, "").trim();
      // 세트 정보 추출

      // 유효한 키인지 확인
      if (validKeys.includes(currentKey)) {
        let j = i + 1;
        let value = "";

        while (j < dataList.length) {
          const potentialValue = dataList[j].replace(/[^0-9.%]/g, "").trim();
          if (validKeys.includes(dataList[i - 1])) {
            value = dataList[j + 1];
            break;
          }

          if (
            potentialValue.endsWith("%") ||
            !isNaN(parseFloat(potentialValue))
          ) {
            if (currentKey === "속도" && potentialValue.endsWith("%")) {
              const nextValue = dataList[j + 1]
                ?.replace(/[^0-9.%]/g, "")
                .trim();
              value = nextValue || potentialValue;
              break;
            }
            if (
              (currentKey === "공격력" ||
                currentKey === "생명력" ||
                currentKey === "방어력") &&
              (potentialValue === "6" || potentialValue === "15")
            ) {
              // 다음 값을 확인
              const nextValue = dataList[j + 1]
                ?.replace(/[^0-9.%]/g, "")
                .trim();
              if (nextValue === "6" || nextValue === "15") {
                // 두 번째 값도 6 또는 15이면 다음으로 넘어감
                j += 2;
                continue;
              } else {
                // 두 번째 값이 유효하면 그 값을 사용
                value = nextValue || potentialValue;
                break;
              }
            } else {
              // 일반적인 경우, 첫 번째 유효한 값을 사용
              value = potentialValue;
              break;
            }
          }
          j++;
        }

        if (value) {
          parsedData.push({ key: currentKey, value });
          // i = j; // i를 찾은 값의 위치로 업데이트
        }
      }

      if (currentKey.includes("세트")) {
        setInfo = currentKey
          .replace(/[^가-힣a-zA-Z0-9%]/g, "")
          .replace("의", "")
          .replace("세트", "")
          .trim();

        continue;
      }
    }

    return {
      parsedData,
      set: setInfo,
    };
  }
  const handleExtractText = async () => {
    //     setParseData({
    //     "parsedData": [
    //       {
    //           "key": "hp",
    //           "value": "65%"
    //       },
    //       {
    //           "key": "def",
    //           "value": "17%"
    //       },
    //       {
    //           "key": "spd",
    //           "value": "12"
    //       },
    //       {
    //           "key": "efr",
    //           "value": "20%"
    //       },
    //       {
    //           "key": "eff",
    //           "value": "8%"
    //       }
    //   ],
    //   "set": "속도44"
    // });
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const imageDataUrl = canvas.toDataURL("image/png");
    const base64Image = imageDataUrl.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      "",
    );

    const apiKey = visionApiKey;
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
      // const response = test;

      const result = await response.json();
      // const result = response;
      console.log("result", result);
      if (!result.responses[0].fullTextAnnotation) {
        alert("옵션 추출에 실패했습니다.");
        return;
      } else {
        const extractedText = result.responses[0].fullTextAnnotation
          ? result.responses[0].fullTextAnnotation.text
          : "No text found";
        const list = extractedText.split("\n");
        const data = parseEquipmentData(list);
        console.log(data);

        setParseData(data);
      }
    } catch (error) {
      console.error("Error fetching Vision API:", error);
      // setText("텍스트 추출 실패");
    }
  };

  return (
    <div className="img-to-text">
      <div className="d-flex">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button onClick={handleFileButtonClick}>이미지 선택</button>
        <button onClick={handleExtractText}>텍스트 추출</button>
      </div>
      <div className="canvas-wrap">
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
      </div>
    </div>
  );
}
