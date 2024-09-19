import { IHero } from "@/modules/api";
import PickBox from "../PickBox";
import { IHeroFilterProps } from "./HeroFilter";
import { Link } from "react-router-dom";

export default function HeroGrid(props: IHeroFilterProps) {
  const { data = [] } = props;

  if (data.length < 1) return null;
  return (
    <div className="hero-grid">
      {data.map((item: IHero) => {
        if (!item.isShow) return null; // 보이지 않는 항목은 렌더링하지 않음
        return (
          <Link
            to={`#`}
            className="col-6 col-md-4 col-lg-3 custom-xl-20"
            style={{ display: "inline-block" }}
            key={item.id}
          >
            <div className="pick-box-wrap">
              <PickBox data={item} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
