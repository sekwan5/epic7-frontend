/* eslint-disable react-hooks/exhaustive-deps */
import { IHero } from "../data/getHeroData";
import { api, IHeroBuild, IRTAData } from "../api";
import HeroDtlHeader from "@/components/hero/heroDtl/HeroDtlHeader";
import { useEffect, useState } from "react";
import HeroDtlTab from "@/components/hero/heroDtl/HeroDtlTab";
import BuildsContent from "@/components/hero/heroDtl/BuildsContent";
import RTAContent from "@/components/hero/heroDtl/RtaContent";
import { useLoaderData } from "react-router-dom";

export default function HeroDtlWrap() {
  const { id, hero } = useLoaderData() as { id: string; hero: IHero };
  const tabs = ["BUILDS", "RTA"];
  const [activeTab1, setActiveTab1] = useState(tabs[0]);
  const [builds, setBuilds] = useState<IHeroBuild[]>([]);
  const [rta, setRta] = useState<IRTAData>({} as IRTAData);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const builds = await api.hero.getHeroBuilds(id);
    setBuilds(builds);
    const rta = await api.hero.getHeroRtaData(id);
    setRta(rta);
  };

  return (
    <>
      <div className="hero-dtl-header-wrap">
        <HeroDtlHeader data={hero} />
      </div>
      <div className="container hero-dtl">
        <div className="hero-dtl-content">
          <HeroDtlTab
            tabs={tabs}
            activeTab={activeTab1}
            onTabChange={setActiveTab1}
          />
          <div className="tab-content">
            {activeTab1 === "BUILDS" && <BuildsContent builds={builds} />}
            {activeTab1 === "RTA" && (
              <RTAContent rtaData={rta} heroData={hero} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
