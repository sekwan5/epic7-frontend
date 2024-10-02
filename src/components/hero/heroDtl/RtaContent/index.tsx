/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { api, IRTAData } from "@/modules/api";
import { IHero } from "@/modules/data/getHeroData";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";

import Select from "react-select";

export default function RTAContent({
  heroData,
  tab,
}: {
  heroData: IHero;
  tab: string;
}) {
  const [rta, setRta] = useState<IRTAData>({} as IRTAData);

  useEffect(() => {
    getData(selectedSeason.value);
  }, []);

  const getData = async (season: string) => {
    const rta = await api.hero.getHeroRtaData(heroData.id, season);
    setRta(rta);
  };

  const [selectedSet, setSelectedSet] = useState<string[]>([]);

  const handleEquipSelect = (key: string[]) => {
    setSelectedSet((prevSet) =>
      prevSet.length === key.length && prevSet.every((set) => key.includes(set))
        ? []
        : key,
    );
  };
  const handleSeasonChange = (option: any) => {
    console.log(option);
    getData(option.value);
    setSelectedSeason(option);
  };
  const seasonOptions = [
    { value: "s1", label: "추격의 시즌 " },
    { value: "s0", label: "프리 시즌 " },
  ];
  const [selectedSeason, setSelectedSeason] = useState(seasonOptions[0]);

  if (tab === "BUILDS") return null;
  return (
    <div className="rta-content">
      <div className="season-select">
        <Select
          options={seasonOptions}
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="season-select-container"
          classNamePrefix="season-select"
          components={{ IndicatorSeparator: () => null }}
        />
      </div>
      <Section1 heroData={heroData} rtaData={rta} />
      <Section2
        rtaData={rta}
        onEquipSelect={handleEquipSelect}
        selectedSet={selectedSet}
      />
      <Section3 rtaData={rta} selectedSet={selectedSet} />
    </div>
  );
}
