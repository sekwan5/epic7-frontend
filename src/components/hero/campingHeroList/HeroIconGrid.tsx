import { useState, useEffect } from "react";
import { IHeroFilterProps } from "../heroList/HeroFilter";
import HeroIcon from "../heroIcon";
import { IHero } from "@/modules/data/getHeroData";
import { useAppDispatch } from "@/store/hooks";
import {
  deleteCampingHeroList,
  lockCampingHeroList,
  setCampingHeroList,
} from "@/store/campSlice";
import { useInView } from "react-intersection-observer";

const ITEMS_PER_PAGE = 20; // 한 번에 로드할 아이템 수

export default function HeroIconGrid(props: IHeroFilterProps) {
  const { data, setData, tab } = props;
  const dispatch = useAppDispatch();
  const [visibleItems, setVisibleItems] = useState<IHero[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        !(tab === 0 && (!item.isShow || item.campPick)) &&
        !(tab === 1 && (!item.isShow || !item.campPick)) &&
        item.isShow,
    );
    setVisibleItems(filteredData.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  }, [data, tab]);

  useEffect(() => {
    if (inView) {
      const filteredData = data.filter(
        (item) =>
          !(tab === 0 && (!item.isShow || item.campPick)) &&
          !(tab === 1 && (!item.isShow || !item.campPick)) &&
          item.isShow,
      );
      const nextItems = filteredData.slice(0, (page + 1) * ITEMS_PER_PAGE);
      setVisibleItems(nextItems);
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, data, tab, page]);

  if (data.length < 1) return null;

  const handleClick = (item: IHero) => {
    switch (tab) {
      case 0: {
        const updatedData = data.map((hero) =>
          hero.id === item.id ? { ...hero, campPick: true } : hero,
        );
        setData(updatedData);
        dispatch(setCampingHeroList(item));
        break;
      }
      case 1: {
        const updatedDataLock = data.map((hero) =>
          hero.id === item.id ? { ...hero, isLock: !hero.isLock } : hero,
        );
        setData(updatedDataLock);
        dispatch(lockCampingHeroList(item));
        break;
      }
      default:
        break;
    }
  };

  const handleDelete = (item: IHero) => {
    const updatedData = data.map((hero) =>
      hero.id === item.id ? { ...hero, campPick: false } : hero,
    );
    setData(updatedData);
    dispatch(deleteCampingHeroList(item));
  };

  return (
    <div className="camping-content-wrap">
      <div className="hero-icon-grid">
        {visibleItems.map((item: IHero) => (
          <div
            className="hero-icon-wrap"
            key={item.id}
            onClick={() => handleClick(item)}
          >
            <HeroIcon
              data={item}
              useOption={tab === 1 ? true : false}
              handleDelete={handleDelete}
            />
          </div>
        ))}
        <div ref={ref} style={{ height: "20px" }} /> {/* 관찰 대상 요소 */}
      </div>
    </div>
  );
}
