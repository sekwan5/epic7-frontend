// import React, { useState, useRef, useEffect } from "react";

// // Tesseract.js의 WorkerOptions 타입을 확장합니다.

// interface ImageToTextProps {
//   setText: (text: string) => void;
// }

// const ImageToText = ({ setText }: ImageToTextProps) => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [selection, setSelection] = useState({
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0,
//   });
//   const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
//     null,
//   );
//   const [isSelecting, setIsSelecting] = useState(false);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);
//   const processedCanvasRef = useRef<HTMLCanvasElement>(
//     document.createElement("canvas"),
//   ); // 미리 생성된 캔버스

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const drawImage = () => {
//     const canvas = canvasRef.current;
//     const image = imageRef.current;
//     if (!canvas || !image) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // 캔버스 크기에 맞춰 이미지 그리기
//     ctx.drawImage(image, 0, 0, image.width, image.height);
//   };

//   const drawSelection = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.strokeStyle = "blue";
//     ctx.lineWidth = 2;
//     ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);
//   };

//   const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // 선택 영역을 캔버스 기준으로 설정
//     setSelection({ x, y, width: 0, height: 0 });
//     setIsSelecting(true);
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isSelecting) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     setSelection((prev) => ({
//       ...prev,
//       width: x - prev.x,
//       height: y - prev.y,
//     }));

//     drawImage();
//     drawSelection();
//   };

//   const handleMouseUp = () => {
//     setIsSelecting(false);
//   };

//   // 터치 이벤트 핸들러들
//   const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.touches[0].clientX - rect.left;
//     const y = e.touches[0].clientY - rect.top;

//     setSelection({ x, y, width: 0, height: 0 });
//     setIsSelecting(true);
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
//     if (!isSelecting) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.touches[0].clientX - rect.left;
//     const y = e.touches[0].clientY - rect.top;

//     setSelection((prev) => ({
//       ...prev,
//       width: x - prev.x,
//       height: y - prev.y,
//     }));

//     drawImage();
//     drawSelection();
//   };

//   const handleTouchEnd = () => {
//     setIsSelecting(false);
//   };

//   // 고해상도 캔버스 설정 함수
//   const setupCanvas = () => {
//     const canvas = canvasRef.current;
//     const img = imageRef.current;
//     if (!canvas || !img) return;

//     const ctx = canvas.getContext("2d");
//     const devicePixelRatio = window.devicePixelRatio || 1;

//     // CSS에서 보여지는 크기와 일치하도록 설정
//     canvas.style.width = `${img.width}px`;
//     canvas.style.height = `${img.height}px`;

//     // 고해상도 설정: 캔버스의 실제 픽셀 크기를 디스플레이 비율에 맞게 증가
//     canvas.width = img.width * devicePixelRatio;
//     canvas.height = img.height * devicePixelRatio;

//     // 컨텍스트의 스케일을 조정하여 고해상도 디스플레이에서 선명하게 그리기
//     if (ctx) {
//       ctx.scale(devicePixelRatio, devicePixelRatio);
//       ctx.drawImage(img, 0, 0, img.width, img.height);
//     }
//   };

//   useEffect(() => {
//     if (selectedImage && canvasRef.current && imageRef.current) {
//       const img = imageRef.current;
//       img.onload = () => {
//         setupCanvas(); // 고해상도 캔버스 설정
//       };
//     }
//   }, [selectedImage]);

//   const preprocessImage = (canvas: HTMLCanvasElement) => {
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return canvas;

//     // 원본 이미지 데이터 가져오기
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     // 대비 및 밝기 조정 파라미터
//     const contrast = 1.5; // 대비 증가 (1.0보다 크면 대비 증가)
//     const brightness = 30; // 밝기 증가 (양수면 밝아짐, 음수면 어두워짐)

//     // 대비 및 밝기 조정
//     for (let i = 0; i < data.length; i += 4) {
//       let avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]; // 그레이스케일 변환

//       // 대비 조정: (픽셀값 - 128) * contrast + 128
//       avg = (avg - 128) * contrast + 128;

//       // 밝기 조정
//       avg += brightness;

//       // 값 범위 제한 (0-255)
//       avg = Math.max(0, Math.min(255, avg));

//       data[i] = data[i + 1] = data[i + 2] = avg; // red, green, blue에 동일하게 적용
//     }

//     // 이미지 데이터 다시 캔버스에 적용
//     ctx.putImageData(imageData, 0, 0);

//     return canvas;
//   };

//   const handleExtractText = async () => {
//     if (!canvasRef.current) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // 선택된 영역의 이미지 데이터만 가져옴
//     const { width, height } = selection;
//     if (width === 0 || height === 0) {
//       alert("텍스트를 추출할 영역을 선택해 주세요.");
//       return;
//     }
//     const imageData = ctx.getImageData(
//       selection.x,
//       selection.y,
//       selection.width,
//       selection.height,
//     );

//     // 선택된 영역만 포함하는 새 캔버스 생성
//     const tempCanvas = document.createElement("canvas");
//     tempCanvas.width = selection.width;
//     tempCanvas.height = selection.height;
//     const tempCtx = tempCanvas.getContext("2d");
//     if (!tempCtx) return;
//     tempCtx.putImageData(imageData, 0, 0);

//     // 이미지 전처리
//     const processedCanvas = preprocessImage(tempCanvas);
//     processedCanvasRef.current = processedCanvas; // 미리 생성된 캔버스에 저장

//     const processedImageUrl = processedCanvas.toDataURL();
//     setProcessedImageUrl(processedImageUrl); // 미리보기용 URL 설정

//     // Tesseract.js를 사용하여 선택된 영역의 텍스트만 추출
//     const apiKey = "AIzaSyDapu8iTty2V_6E7Kk70KohQE0j2vcb0M8"; // 여기에 Google Vision API 키를 입력하세요
//     const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

//     const requestPayload = {
//       requests: [
//         {
//           image: {
//             content: processedCanvas
//               .toDataURL()
//               .replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
//           },
//           features: [
//             {
//               type: "TEXT_DETECTION",
//             },
//           ],
//         },
//       ],
//     };

//     try {
//       const response = await fetch(visionApiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestPayload),
//       });

//       const result = await response.json();
//       const extractedText = result.responses[0].fullTextAnnotation
//         ? result.responses[0].fullTextAnnotation.text
//         : "No text found";

//       setText(extractedText);
//     } catch (error) {
//       console.error("Error fetching Vision API:", error);
//       setText("텍스트 추출 실패");
//     }
//   };
//   return (
//     <div className="img-to-text">
//       <div className="d-flex">
//         <input type="file" accept="image/*" onChange={handleImageUpload} />
//         <button onClick={handleExtractText}>텍스트 추출</button>
//       </div>

//       <div className="d-flex flex-column">
//         {selectedImage && (
//           <div className="img-wrap">
//             <img
//               ref={imageRef}
//               src={selectedImage}
//               alt="Uploaded"
//               style={{
//                 visibility: "hidden",
//                 width: "100%",
//                 height: "100%",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//               }}
//             />
//             <canvas
//               ref={canvasRef}
//               style={{
//                 border: "1px solid black",
//                 width: "100%",
//                 height: "100%",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//               }}
//               onMouseDown={handleMouseDown}
//               onMouseMove={handleMouseMove}
//               onMouseUp={handleMouseUp}
//               onTouchStart={handleTouchStart}
//               onTouchMove={handleTouchMove}
//               onTouchEnd={handleTouchEnd}
//             />
//           </div>
//         )}
//       </div>
//       {/* 전처리된 이미지 미리보기 */}
//       {processedImageUrl && (
//         <div>
//           <h4>전처리된 이미지 미리보기</h4>
//           <img
//             src={processedImageUrl}
//             alt="Processed Preview"
//             style={{ border: "1px solid red", width: "40%" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageToText;
