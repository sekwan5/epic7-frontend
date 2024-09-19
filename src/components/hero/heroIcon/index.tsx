"use client";
import { IHero } from "@/modules/api";
import ProfileImg from "./ProfileImg";
import CoImage from "@/components/common/CoImages";

export default function HeroIcon(props: {
  data: IHero;
  useOption?: boolean;
  handleDelete?: (item: IHero) => void;
  usename?: boolean;
}) {
  const { data, useOption, handleDelete, usename = true } = props;
  const imgUrl = import.meta.env.VITE_ASSETS_URL;

  return (
    <div className="hero-icon">
      <div className="icon-wrap">
        <CoImage
          className="icon"
          src={`${imgUrl}/job/${data.job_id}.png`}
          alt="job"
          width={30}
          height={30}
        />
        <CoImage
          className="icon"
          src={`${imgUrl}/type/${data.type_id}.png`}
          alt="type"
          width={30}
          height={30}
        />
      </div>
      <ProfileImg data={data} />
      {useOption && (
        <div className="option-wrap">
          {data.isLock ? <i className="ico-lock" /> : <div></div>}
          <i
            className="ico-hero-delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete && handleDelete(data);
            }}
          />
        </div>
      )}
      {usename && <span className="hero-name">{data.name}</span>}
    </div>
  );
}
