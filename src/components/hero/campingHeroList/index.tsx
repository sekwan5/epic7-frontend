/* eslint-disable react-hooks/exhaustive-deps */
import HeroIconGrid from "./HeroIconGrid";
import { useEffect, useState } from "react";
import HeroFilter from "../heroList/HeroFilter";
import CampingTab from "../../camp/CampingTab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetCampingHeroList, setHeroList } from "@/store/campSlice";
import CampingResult from "@/components/camp/CampingResult";
import { getAllHeroes, IHero } from "@/modules/data/getHeroData";

export default function CampingList() {
  const dispatch = useAppDispatch();

  const { heroList } = useAppSelector((state) => state.camp);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (heroList.length < 1) {
      getHeroList();
    }
  }, []);

  const getHeroList = () => {
    const heroList = getAllHeroes();
    const updatedHeroList = heroList.map((hero) => ({
      ...hero,
      isShow: true,
    }));
    dispatch(setHeroList(updatedHeroList));
    dispatch(resetCampingHeroList());
  };

  const setData = (data: IHero[]) => {
    dispatch(setHeroList(data));
  };

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
          <CampingResult tab={2} />
        </>
      )}
      {tab === 3 && (
        <>
          <CampingResult tab={3} />
        </>
      )}
    </div>
  );
}
