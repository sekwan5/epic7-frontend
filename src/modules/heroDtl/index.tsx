import { IHero } from "../data/getHeroData";
import { IHeroBuild } from "../api";
import HeroDtlHeader from "@/components/hero/heroDtl/HeroDtlHeader";
import { useState } from "react";
import HeroDtlTab from "@/components/hero/heroDtl/HeroDtlTab";
import RTAContent from "@/components/hero/heroDtl/RtaContent";
import BuildsContent from "@/components/hero/heroDtl/BuildsContent";

export default function HeroDtlWrap(props: {
  data: IHero;
  builds: IHeroBuild[];
}) {
  const { data, builds } = props;
  const tabs = ["BUILDS", "RTA"];
  const [activeTab1, setActiveTab1] = useState(tabs[0]);
  return (
    <>
      <div className="hero-dtl-header-wrap">
        <HeroDtlHeader data={data} />
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
            {activeTab1 === "RTA" && <RTAContent data={data} />}
          </div>
        </div>
      </div>
    </>
  );
}
