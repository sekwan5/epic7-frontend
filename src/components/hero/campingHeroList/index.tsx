/* eslint-disable react-hooks/exhaustive-deps */
import HeroIconGrid from "./HeroIconGrid";
import { useEffect, useState } from "react";
import HeroFilter from "../heroList/HeroFilter";
import CampingTab from "../../camp/CampingTab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetCampingHeroList,
  setCampingResultList,
  setHeroList,
} from "@/store/campSlice";
import CampingResult from "@/components/camp/CampingResult";
import {
  CampDataBuilder,
  getBestChatOptions,
  getHeroCombinations,
} from "@/components/camp/hook";
import { api, IHero } from "@/modules/api";

export default function CampingList() {
  const dispatch = useAppDispatch();

  const { heroList, campingHeroList, campResultList, campBookMarkList } =
    useAppSelector((state) => state.camp);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (heroList.length < 1) {
      getHeroList();
    }
  }, []);

  const getHeroList = async () => {
    try {
      const heroList = await api.hero.getHeroes({ limit: 400 });
      const updatedHeroList = heroList.map((hero) => ({
        ...hero,
        isShow: true,
      }));
      dispatch(setHeroList(updatedHeroList));
      dispatch(resetCampingHeroList());
    } catch (error) {
      console.log(error);
    }
  };

  const setData = (data: IHero[]) => {
    dispatch(setHeroList(data));
  };
  useEffect(() => {
    if (campingHeroList.length >= 4) {
      const tmpList = campingHeroList.map((item: IHero) => {
        try {
          if (item.camping && item.camping.personalities) {
            const campValue = CampDataBuilder(item.camping.personalities);
            return {
              ...item,
              camping: {
                ...item.camping,
                campValue,
              },
            };
          } else {
            console.warn(`Missing camping data for hero: ${item.name}`);
            return item; // 캠핑 데이터가 없는 경우 원본 아이템 반환
          }
        } catch (error) {
          console.error(
            `Error processing camping data for hero: ${item.name}`,
            error,
          );
          return item; // 에러 발생 시 원본 아이템 반환
        }
      });

      const combinations = getHeroCombinations(tmpList);
      const result = combinations.map((combination) => {
        return getBestChatOptions(combination);
      });
      result.sort((a, b) => b.score - a.score);
      dispatch(setCampingResultList(result));
    } else {
      dispatch(setCampingResultList([]));
    }
  }, [campingHeroList]);

  return (
    <div className="hero-list">
      <CampingTab setTab={setTab} tab={tab} />
      {tab === 0 && (
        <>
          <HeroFilter data={heroList} setData={setData} />
          <HeroIconGrid data={heroList} setData={setData} tab={0} />
        </>
      )}
      {tab === 1 && (
        <>
          <HeroFilter data={heroList} setData={setData} />
          <HeroIconGrid data={heroList} setData={setData} tab={1} />
        </>
      )}
      {tab === 2 && (
        <>
          <CampingResult data={campResultList} useBookMark={true} />
        </>
      )}
      {tab === 3 && (
        <>
          <CampingResult data={campBookMarkList} useBookMark={false} />
        </>
      )}
    </div>
  );
}
