import { IHero } from "@/modules/data/getHeroData";

export default function RTAContent({ data }: { data: IHero }) {
  return (
    <div className="rta-content">
      <h3>RTA 정보</h3>
      {/* RTA 관련 정보를 여기에 추가 */}
    </div>
  );
}
