/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from "react";
import CoImage from "../common/CoImages";
import { getArtifactByCode } from "@/modules/data/getArtiData";

export default function Artifact({
  data,
  useStatus = true,
}: {
  data: any;
  useStatus?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(350px) rotateX(0deg) rotateY(0deg)",
  );
  const [overlayPosition, setOverlayPosition] = useState("0% 0%");
  const [isDesktop, setIsDesktop] = useState(false);
  const imgUrl = import.meta.env.VITE_ASSETS_URL;
  const artiData = getArtifactByCode(data.code);

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (-1 / 5) * x + 20;
        const rotateX = (4 / 30) * y - 20;

        setTransform(
          `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        );

        const backgroundPositionX = (x / 5) % 100;
        const backgroundPositionY = (y / 5) % 100;
        setOverlayPosition(`${backgroundPositionX}% ${backgroundPositionY}%`);
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      setTransform("perspective(350px) rotateX(0deg) rotateY(0deg)");
      setOverlayPosition("0% 0%");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  return (
    <div
      className={`card-3d ${isDesktop ? "desktop" : "mobile"} ${
        isFlipped ? "flipped" : ""
      }`}
      ref={cardRef}
      style={isDesktop && !isFlipped ? { transform } : {}}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <CoImage
            src={`${imgUrl}/arti_images/${data.code}.webp`}
            alt={data.code}
            className="card-image"
          />
          {isDesktop && (
            <div
              className="overlay"
              ref={overlayRef}
              style={{ backgroundPosition: overlayPosition }}
            ></div>
          )}
          {data.usage !== undefined && typeof data.usage === "number" ? (
            <>
              <div className="arti-usage">{`채용률 ${data.usage.toFixed(1)}%
              ${data.win_rate && data.win_rate > 0 ? `/ 승률 ${data.win_rate.toFixed(1)}%` : ""}`}</div>
            </>
          ) : (
            <div className="arti-usage"></div>
          )}
          <div className="arti-name">{artiData?.arti_nm_kr}</div>
          <CoImage
            src={`/images/arti_name_frame.png`}
            alt={"frame"}
            className="arti-name-frame"
          />
          <div className="artifact-grade">
            {[...Array(artiData?.grade)].map((_, index) => (
              <img
                key={index}
                src="/icons/star.png"
                alt="Star"
                className="grade-star"
              />
            ))}
          </div>
          {useStatus &&
          (artiData?.status === "new" || artiData?.status === "update") ? (
            <img
              className="status-icon"
              src={`${imgUrl}/icon/${artiData?.status}.png`}
              alt="hero"
            />
          ) : null}
        </div>
        <div className="card-back">
          <CoImage
            src={`${imgUrl}/arti_images/${data.code}.webp`}
            alt={data.code}
            className="card-image"
          />
          <div className="card-back-content">
            <div className="skill-level">
              <div className="d-flex justify-content-between">
                <div className="level-title">Lv.1</div>
                <div className="arti-stats d-flex justify-content-between gap-2">
                  <div className="d-flex align-items-center">
                    <CoImage
                      className="stat-icon"
                      src={`${imgUrl}/stat/atk.png`}
                      alt="atk"
                      width={18}
                      height={18}
                    />
                    <div>{artiData?.atk_base}</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <CoImage
                      className="stat-icon"
                      src={`${imgUrl}/stat/hp.png`}
                      alt="hp"
                      width={18}
                      height={18}
                    />
                    <div>{artiData?.health_base}</div>
                  </div>
                </div>
              </div>
              <div className="skill-description">{artiData?.arti_base_kr}</div>
            </div>

            <div className="skill-level">
              <div className="d-flex justify-content-between">
                <div className="level-title">Lv.Max</div>
                <div className="arti-stats d-flex justify-content-between gap-2">
                  <div className="d-flex align-items-center">
                    <CoImage
                      className="stat-icon"
                      src={`${imgUrl}/stat/atk.png`}
                      alt="atk"
                      width={18}
                      height={18}
                    />
                    <div>{artiData?.atk_max}</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <CoImage
                      className="stat-icon"
                      src={`${imgUrl}/stat/hp.png`}
                      alt="hp"
                      width={18}
                      height={18}
                    />
                    <div>{artiData?.health_max}</div>
                  </div>
                </div>
              </div>
              <div className="skill-description">{artiData?.arti_max_kr}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
