import { useState, useEffect } from "react";
import { IHero } from "@/modules/data/getHeroData";
import PickBox from "../PickBox";
import { IHeroFilterProps } from "./HeroFilter";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const ITEMS_PER_PAGE = 20; // 한 번에 로드할 아이템 수

export default function HeroGrid(props: IHeroFilterProps) {
  const { data = [] } = props;
  const [visibleItems, setVisibleItems] = useState<IHero[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    const filteredData = data.filter((item) => item.isShow);
    setVisibleItems(filteredData.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  }, [data]);

  useEffect(() => {
    if (inView) {
      const filteredData = data.filter((item) => item.isShow);
      const nextItems = filteredData.slice(0, (page + 1) * ITEMS_PER_PAGE);
      setVisibleItems(nextItems);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, data, page]);

  if (data.length < 1) return null;

  return (
    <div className="hero-grid">
      {visibleItems.map((item: IHero) => (
        <Link
          to={`/hero/${item.id}`}
          className="col-6 col-md-4 col-lg-3 custom-xl-20"
          style={{ display: "inline-block" }}
          key={item.id}
        >
          <div className="pick-box-wrap">
            <PickBox data={item} />
          </div>
        </Link>
      ))}
      <div ref={ref} style={{ height: "20px" }} /> {/* 관찰 대상 요소 */}
    </div>
  );
}
