import { api, IHero } from "@/modules/api";
import HeroFilter from "./HeroFilter";
import HeroGrid from "./HeroGrid";
import { useEffect, useState } from "react";

export default function HeroList() {
  const [data, setData] = useState<IHero[]>([]);

  useEffect(() => {
    getHeroList();
  }, []);

  const getHeroList = async () => {
    try {
      const heroList = await api.hero.getHeroes({ limit: 400 });
      const updatedHeroList = heroList.map((hero) => ({
        ...hero,
        isShow: true,
      }));
      setData(updatedHeroList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero-list">
      <HeroFilter data={data} setData={setData} />
      <HeroGrid data={data} setData={setData} />
    </div>
  );
}
