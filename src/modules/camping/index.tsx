import { PageTitle } from "@/components/common/PageTitle";
import CampingList from "@/components/hero/campingHeroList";

export default function CampingWrap() {
  return (
    <div className="container">
      <div className="hero-list-wrap">
        <PageTitle>
          <h2>미궁 시뮬레이터</h2>
        </PageTitle>
        <CampingList />
      </div>
    </div>
  );
}
