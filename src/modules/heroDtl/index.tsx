/* eslint-disable react-hooks/exhaustive-deps */
import { IHero } from "../data/getHeroData";
import { api, IHeroBuild } from "../api";
import HeroDtlHeader from "@/components/hero/heroDtl/HeroDtlHeader";
import { useEffect, useState } from "react";
import HeroDtlTab from "@/components/hero/heroDtl/HeroDtlTab";
import BuildsContent from "@/components/hero/heroDtl/BuildsContent";
import RTAContent from "@/components/hero/heroDtl/RtaContent";
import { useLoaderData } from "react-router-dom";
import GoogleAdsense from "@/components/common/GoogleAdsense";

export default function HeroDtlWrap() {
  const { id, hero } = useLoaderData() as { id: string; hero: IHero };
  const tabs = ["RTA", "BUILDS"];
  const [activeTab1, setActiveTab1] = useState(tabs[0]);
  const [builds, setBuilds] = useState<IHeroBuild[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const builds = await api.hero.getHeroBuilds(id);
    setBuilds(builds);
  };

  return (
    <>
      <div className="hero-dtl-header-wrap">
        <HeroDtlHeader data={hero} />
      </div>
      <div className="hero-dtl-ad d-flex justify-content-center">
        <GoogleAdsense client="ca-pub-2070133047683758" slot="5465225537" />
      </div>
      <div className="container hero-dtl">
        <div className="hero-dtl-content">
          <HeroDtlTab
            tabs={tabs}
            activeTab={activeTab1}
            onTabChange={setActiveTab1}
          />
          <div className="tab-content">
            <BuildsContent builds={builds} tab={activeTab1} />
            <RTAContent heroData={hero} tab={activeTab1} />
          </div>
        </div>
      </div>
    </>
  );
}
