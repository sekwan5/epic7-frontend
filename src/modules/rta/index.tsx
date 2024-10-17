import { PageTitle } from "@/components/common/PageTitle";
import KakaoAdFit from "../KakaoAdFit";
import { IRTAListData, RtaInfoGrid } from "@/components/rta/RtaInfoGrid";
import { api } from "../api";
import { useEffect, useState } from "react";

export default function RtaInfo() {
  const [rtaDataList, setRtaDataList] = useState<IRTAListData[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("rtaDataList");
    const lastUpdated = localStorage.getItem("rtaDataLastUpdated");
    const currentTime = new Date().getTime();

    // 데이터가 로컬 스토리지에 있고, 마지막 업데이트가 5분 이내인 경우
    if (
      storedData &&
      lastUpdated &&
      currentTime - Number(lastUpdated) < 5 * 60 * 1000
    ) {
      setRtaDataList(JSON.parse(storedData)); // 로컬 스토리지에서 데이터 가져오기
    } else {
      getData(); // 데이터가 없거나 오래된 경우 API 요청
    }
  }, []);

  const getData = async () => {
    const data = await api.hero.getHeroRtaDataList("s1");
    setRtaDataList(data);
    localStorage.setItem("rtaDataList", JSON.stringify(data)); // API 응답을 로컬 스토리지에 저장
    localStorage.setItem("rtaDataLastUpdated", new Date().getTime().toString()); // 마지막 업데이트 시간 저장
  };
  return (
    <div className="container rta-info">
      <PageTitle depth="hero">
        <h2>실시간 아레나 정보</h2>
      </PageTitle>
      <div className="adfit-wrap d-flex justify-content-center">
        <KakaoAdFit unit="DAN-cQE3qaOuRjlL4sWo" width="728" height="90" />
      </div>
      <div className="rtaInfo-list-wrap">
        <div className="grid-container">
          <RtaInfoGrid rtaDataList={rtaDataList} />
        </div>
      </div>
    </div>
  );
}
