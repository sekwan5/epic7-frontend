import React, { useEffect, useRef } from "react";

interface KakaoAdFitProps {
  unit: string;
  width: string;
  height: string;
}

const KakaoAdFit: React.FC<KakaoAdFitProps> = ({ unit, width, height }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.kakao && window.kakao.ads && containerRef.current) {
      const ins = document.createElement("ins");
      const script = document.createElement("script");

      ins.className = "kakao_ad_area";
      ins.style.display = "none";
      ins.setAttribute("data-ad-unit", unit);
      ins.setAttribute("data-ad-width", width);
      ins.setAttribute("data-ad-height", height);

      script.async = true;
      script.type = "text/javascript";
      script.src = "https://t1.daumcdn.net/kas/static/ba.min.js";

      containerRef.current.appendChild(ins);
      containerRef.current.appendChild(script);
    }
  }, [unit, width, height]);

  return <div ref={containerRef} />;
};

export default KakaoAdFit;
