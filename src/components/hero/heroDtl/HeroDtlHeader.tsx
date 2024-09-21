import { IHero } from "@/modules/data/getHeroData";
import ProfileImg from "../heroIcon/ProfileImg";
import CoImage from "@/components/common/CoImages";

export default function HeroDtlHeader(props: { data: IHero }) {
  const { data } = props;
  const imgUrl = import.meta.env.VITE_ASSETS_URL;
  console.log("data", data);

  return (
    <div className="hero-dtl-header">
      <div className="profile-img-wrap">
        <ProfileImg data={data} />
      </div>
      <div className="text-wrap">
        <div className="name-wrap">
          <span className="name">{data.name}</span>

          <div className="star-wrap">
            {Array(Number(data.grade))
              .fill(null)
              .map((_, i) => (
                <CoImage
                  key={i}
                  className="star-icon"
                  src="/icons/star.png"
                  alt="star"
                />
              ))}
          </div>
        </div>
        <div className="info-wrap">
          <CoImage
            className="type-icon"
            src={`${imgUrl}/type/${data.type_id}.png`}
            alt="type"
          />
          <span>{data.type_nm_kr}</span>
          <CoImage
            className="zodiac-icon"
            src={`${imgUrl}/zodiac/${data.zodiac_id}.png`}
            alt="zodiac"
            width={21}
            height={21}
          />
          <span>{data.zodiac_nm_kr}</span>

          <CoImage
            className="job-icon"
            src={`${imgUrl}/job/${data.job_id}.png`}
            alt="job"
          />
          <span>{data.job_nm_kr}</span>
        </div>
        <div className="recently">최근 업데이트</div>
      </div>
    </div>
  );
}
