import { PageTitle } from "@/components/common/PageTitle";
import HeroList from "@/components/hero/heroList";

export default function HeroListWrap() {
  return (
    <div className="container hero-list">
      <PageTitle>
        <h2>영웅 목록</h2>
      </PageTitle>
      <div className="hero-list-wrap">
        <HeroList />
      </div>
    </div>
  );
}
