"use client";
import { IHeroFilterProps } from "../heroList/HeroFilter";
import HeroIcon from "../heroIcon";
import { IHero } from "@/modules/api/hero";
import { useAppDispatch } from "@/store/hooks";
import {
  deleteCampingHeroList,
  lockCampingHeroList,
  setCampingHeroList,
} from "@/store/campSlice";

export default function HeroIconGrid(props: IHeroFilterProps) {
  const { data, setData, tab } = props;
  const dispatch = useAppDispatch();

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
        {data.map((item: IHero) => {
          if (
            (tab === 0 && (!item.isShow || item.campPick)) ||
            (tab === 1 && (!item.isShow || !item.campPick)) ||
            !item.isShow
          )
            return null;
          return (
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
          );
        })}
      </div>
    </div>
  );
}
