import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

// Tesseract.js의 WorkerOptions 타입을 확장합니다.
export interface IParseData {
  parsedData: {
    key: string;
    value: string;
    flag?: string;
  }[];
  set: string | null;
  part: string | null;
}
interface ImageToTextProps {
  setParseData: (item: IParseData) => void;
}

export interface ImageToTextRef {
  handleFileButtonClick: () => void;
}

export const ImageToText = forwardRef<ImageToTextRef, ImageToTextProps>(
  ({ setParseData }, ref) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const visionApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // 이미지 전처리 함수
    const processImage = (image: HTMLImageElement): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve("");

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const brightnessThreshold = 95;

        for (let i = 0; i < data.length; i += 4) {
          const avg =
            0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          if (avg < brightnessThreshold) {
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(imageData, 0, 0);

        // 고품질 이미지로 변환
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64data = reader.result as string;
                resolve(base64data.split(",")[1]);
              };
              reader.readAsDataURL(blob);
            } else {
              resolve("");
            }
          },
          "image/png",
          1.0,
        );
      });
    };

    // 이미지 업로드 핸들러
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);

          const img = new Image();
          img.onload = async () => {
            const processedImageBase64 = await processImage(img);
            handleExtractText(processedImageBase64);
          };
          img.src = reader.result as string;
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
      part: string | null;
    };

    function parseEquipmentData(dataList: string[]): Result {
      const parsedData: ParsedData[] = [];
      const tmpData: string[] = dataList.map((item) =>
        item.replace(/[^가-힣a-zA-Z0-9%]/g, "").trim(),
      );

      let setInfo: string | null = null;
      let partInfo: string | null = null;
      const validKeys = [
        "생명력",
        "방어력",
        "방어",
        "방어려",
        "속도",
        "치명확률",
        "치명피해",
        "치영피해",
        "공격력",
        "효과저항",
        "효과적중",
        "속도",
      ];
      console.log(tmpData);

      for (let i = 0; i < tmpData.length; i++) {
        const currentKey = tmpData[i];
        console.log(currentKey);
        // 세트 정보 추출

        // 유효한 키인지 확인
        if (validKeys.includes(currentKey)) {
          let j = i + 1;
          let value = "";

          while (j < tmpData.length) {
            const potentialValue = `${tmpData[j]}`;

            if (validKeys.includes(dataList[i - 1])) {
              value = dataList[j + 1];
              break;
            }

            if (
              potentialValue.endsWith("%") ||
              !isNaN(parseFloat(potentialValue))
            ) {
              if (currentKey === "속도" && potentialValue.endsWith("%")) {
                const nextValue = `${dataList[j + 1]}`;
                value = nextValue || potentialValue;
                break;
              }
              if (
                (currentKey === "공격력" ||
                  currentKey === "생명력" ||
                  currentKey === "방어력") &&
                (potentialValue === "6" ||
                  potentialValue === "3" ||
                  potentialValue === "15")
              ) {
                // 다음 값을 확인
                const nextValue = dataList[j + 1];
                if (
                  nextValue === "6" ||
                  nextValue === "3" ||
                  nextValue === "15"
                ) {
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

        if (setInfo === null && currentKey.includes("세트")) {
          setInfo = currentKey
            .replace(/[^가-힣a-zA-Z0-9%]/g, "")
            .replace("의", "")
            .replace("세트", "")
            .trim();

          continue;
        }
        const parts = [
          "투구",
          "무기",
          "갑옷",
          "목걸이",
          "반지",
          "신발",
          "신입",
        ];

        if (partInfo === null) {
          for (const part of parts) {
            if (currentKey.includes(part)) {
              partInfo = part;
              break;
            }
          }
          if (partInfo !== null) {
            continue;
          }
        }
      }

      return {
        parsedData,
        set: setInfo,
        part: partInfo,
      };
    }
    const handleExtractText = async (base64Image: string) => {
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

        const result = await response.json();
        if (!result.responses[0].fullTextAnnotation) {
          alert("옵션 추출에 실패했습니다.");
          return;
        } else {
          const extractedText = result.responses[0].fullTextAnnotation.text;
          const list = [...extractedText.split("\n")];
          const data = parseEquipmentData(list);
          setParseData(data);
        }
      } catch (error) {
        console.error("Error fetching Vision API:", error);
        alert("텍스트 추출 실패");
      }
    };

    useImperativeHandle(ref, () => ({
      handleFileButtonClick,
    }));

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
          {/* 이 버튼은 이제 숨길 수 있습니다 */}
          {/* <button onClick={handleFileButtonClick}>이미지 선택</button> */}
        </div>
        <div className="canvas-wrap">
          {selectedImage && (
            <>
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
              <img
                className="thumbnail"
                src={selectedImage}
                alt="Selected"
                style={{ maxWidth: "100%", height: "auto", display: "block" }}
              />
            </>
          )}
        </div>
      </div>
    );
  },
);
