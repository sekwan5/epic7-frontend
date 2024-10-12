import { PageTitle } from "@/components/common/PageTitle";
import HeroList from "@/components/hero/heroList";
import KakaoAdFit from "../KakaoAdFit";

export default function HeroListWrap() {
  return (
    <div className="container hero-list">
      <PageTitle>
        <h2>영웅 목록</h2>
      </PageTitle>
      <div className="adfit-wrap d-flex justify-content-center">
        <KakaoAdFit unit="DAN-cQE3qaOuRjlL4sWo" width="728" height="90" />
      </div>
      <div className="hero-list-wrap">
        <HeroList />
      </div>
    </div>
  );
}
