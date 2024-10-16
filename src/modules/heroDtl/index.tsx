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
    const storedData = localStorage.getItem(`heroBuilds_${id}`);
    const lastUpdated = localStorage.getItem(`heroBuildsLastUpdated_${id}`);
    const currentTime = new Date().getTime();

    // 데이터가 로컬 스토리지에 있고, 마지막 업데이트가 5분 이내인 경우
    if (
      storedData &&
      lastUpdated &&
      currentTime - Number(lastUpdated) < 5 * 60 * 1000
    ) {
      setBuilds(JSON.parse(storedData)); // 로컬 스토리지에서 데이터 가져오기
    } else {
      getData(); // 데이터가 없거나 오래된 경우 API 요청
    }
  }, [id]);

  const getData = async () => {
    const builds = await api.hero.getHeroBuilds(id);
    setBuilds(builds);
    localStorage.setItem(`heroBuilds_${id}`, JSON.stringify(builds)); // API 응답을 로컬 스토리지에 저장
    localStorage.setItem(
      `heroBuildsLastUpdated_${id}`,
      new Date().getTime().toString(),
    ); // 마지막 업데이트 시간 저장
  };

  return (
    <>
      <div className="hero-dtl-header-wrap">
        <HeroDtlHeader data={hero} />
      </div>
      {/* <div className="hero-dtl-ad d-flex justify-content-center"></div> */}
      <div className="container hero-dtl">
        <GoogleAdsense client="ca-pub-2070133047683758" slot="5465225537" />
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
