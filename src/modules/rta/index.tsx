import { PageTitle } from "@/components/common/PageTitle";
import KakaoAdFit from "../KakaoAdFit";
import { RtaInfoGrid } from "@/components/rta/RtaInfoGrid";

export default function RtaInfo() {
  return (
    <div className="container rta-info">
      <PageTitle>
        <h2>실시간 아레나 정보</h2>
      </PageTitle>
      <div className="adfit-wrap d-flex justify-content-center">
        <KakaoAdFit unit="DAN-cQE3qaOuRjlL4sWo" width="728" height="90" />
      </div>
      <div className="rtaInfo-list-wrap">
        <div className="grid-container">
          <RtaInfoGrid />
        </div>
      </div>
    </div>
  );
}
