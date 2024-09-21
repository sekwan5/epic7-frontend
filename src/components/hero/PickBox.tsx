import { IHero } from "@/modules/data/getHeroData";
import CoImage from "../common/CoImages";

export default function PickBox(props: { data: IHero }) {
  const { data } = props;

  const imgUrl = import.meta.env.VITE_ASSETS_URL;
  if (!data) return null;
  return (
    <div className="pick-box">
      <CoImage
        className="profile-img"
        src={`${imgUrl}/hero_pick_imgs/${data.id}_l.png`}
        alt="hero"
      />
      <div className="pick-box-content-1 d-flex">
        <CoImage
          className="job-icon"
          src={`${imgUrl}/job/${data.job_id}.png`}
          alt="job"
        />
        <span className="pick-box-name">{data.name}</span>
      </div>

      <div className="pick-box-content-2 d-flex">
        <div>
          <CoImage
            className="type-icon"
            src={`${imgUrl}/type/${data.type_id}.png`}
            alt="type"
          />
        </div>
        <div style={{ position: "relative", top: "2px" }}>
          <CoImage
            className="zodiac-icon"
            src={`${imgUrl}/zodiac/${data.zodiac_id}.png`}
            alt="zodiac"
            width={21}
            height={21}
          />
        </div>

        {Array(Number(data.grade))
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              style={{
                marginRight: "-6px",
                alignItems: "center",
              }}
            >
              <CoImage className="star-icon" src="/icons/star.png" alt="star" />
            </div>
          ))}
      </div>
    </div>
  );
}
