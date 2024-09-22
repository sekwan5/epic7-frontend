import { useState } from "react";
import { IRTAData } from "@/modules/api";
import { IHero } from "@/modules/data/getHeroData";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";

export default function RTAContent({
  rtaData,
  heroData,
}: {
  rtaData: IRTAData;
  heroData: IHero;
}) {
  const [selectedSet, setSelectedSet] = useState<string[]>([]);

  const handleEquipSelect = (key: string[]) => {
    setSelectedSet((prevSet) =>
      prevSet.length === key.length && prevSet.every((set) => key.includes(set))
        ? []
        : key,
    );
  };

  return (
    <div className="rta-content">
      <Section1 heroData={heroData} rtaData={rtaData} />
      <Section2
        rtaData={rtaData}
        onEquipSelect={handleEquipSelect}
        selectedSet={selectedSet}
      />
      <Section3 rtaData={rtaData} selectedSet={selectedSet} />
    </div>
  );
}
