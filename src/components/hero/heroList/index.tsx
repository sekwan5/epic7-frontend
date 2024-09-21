import HeroFilter from "./HeroFilter";
import HeroGrid from "./HeroGrid";
import { useEffect, useState } from "react";
import { getAllHeroes, IHero } from "@/modules/data/getHeroData";

export default function HeroList() {
  const [data, setData] = useState<IHero[]>([]);

  useEffect(() => {
    const heroList = getAllHeroes();
    const updatedHeroList = heroList.map((hero) => ({
      ...hero,
      isShow: true,
    }));
    setData(updatedHeroList);
  }, []);

  return (
    <div className="hero-list">
      <HeroFilter data={data} setData={setData} />
      <HeroGrid data={data} setData={setData} />
    </div>
  );
}
