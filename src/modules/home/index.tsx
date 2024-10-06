import HeroDtlTab from "@/components/hero/heroDtl/HeroDtlTab";
import CoImage from "@/components/common/CoImages";
import { getHeroStats, IHero } from "../data/getHeroData";
import PickBox from "@/components/hero/PickBox";
import { getArtifactByStats } from "../data/getArtiData";
import Artifact from "@/components/arti/Artifact";
import { Link } from "react-router-dom";
import KakaoAdFit from "../KakaoAdFit";

export default function HomeContent() {
  const heroList = getHeroStats();
  const artiList = getArtifactByStats();

  return (
    <>
      <div className="container home">
        <div className="update-info">
          <HeroDtlTab tabs={["UPDATE"]} activeTab={"UPDATE"} />
          <div className="update-content">
            <div className="update-hero">
              <div className="hero-grid">
                {heroList.map((item: IHero) => {
                  return (
                    <Link
                      to={`/hero/${item.id}`}
                      className="col-6 "
                      key={item.id}
                    >
                      <div className="pick-box-wrap">
                        <PickBox data={item} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="update-arti">
              <div className="arti-wrap d-flex justify-content-center">
                {artiList.map((item) => (
                  <div
                    className="col-6 d-flex justify-content-center"
                    style={{ marginBottom: "20px" }}
                    key={item.identifier}
                  >
                    <Artifact data={{ code: item.identifier }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="adfit-wrap d-flex justify-content-center">
          <KakaoAdFit unit="DAN-cQE3qaOuRjlL4sWo" width="728" height="90" />
          <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-cQE3qaOuRjlL4sWo"
            data-ad-width="728"
            data-ad-height="90"
          ></ins>
          <script
            type="text/javascript"
            src="//t1.daumcdn.net/kas/static/ba.min.js"
            async
          ></script>
        </div>
        <div className="notice-wrap">
          <HeroDtlTab tabs={["NOTICE"]} activeTab={"NOTICE"} />
          <div className="notice d-flex justify-content-center align-items-center ">
            <div>
              <p>Epic7GG(에픽지지) Discord 서버가 개설되었습니다. </p>
              <p>
                버그또는 오타제보, 새로은 기능이나 기존 기능에 대한 개선사항을
                요청해주세요.
              </p>
            </div>
            <a
              href="https://discord.gg/CNZE82hpF8"
              target="_blank"
              rel="noopener noreferrer"
              className="discord-link"
            >
              <div className="discord-btn">
                <CoImage src="/images/discord.svg" alt="discord" />
              </div>
            </a>
          </div>
          {/* <h2 className="text-center mt-5">업데이트 노트</h2>
          <p>2024.09.26 </p>
          <p>22,773건의 실시간 아레나 데이터가 추가되었습니다.</p>
          <p className="border-bottom pb-2">
            장비세트별 아티팩트 사용률과함께 승률정보가 추가되었습니다.
          </p>
          <p>2024.09.23 </p>
          <p>장비세트별 사용률과함께 승률정보가 추가되었습니다.</p>
          <p>아티팩트별 승률정보가 추가되었습니다.</p>
          <p className="border-bottom pb-2">
            장비세트별 아티팩트 사용률과함께 승률정보가 추가되었습니다.
          </p>
          <p>2024.09.22 </p>
          <p>홈 {`>`} 신규, 업데이트 영웅, 아티팩트가 추가되었습니다.</p>
          <p>영웅상세 {`>`} 실시간 아레나 통계가 추가되었습니다.</p>
          <p>52,185건의 실시간 아레나 데이터가 추가되었습니다.</p>
          <p className="border-bottom pb-2">
            영웅상세 {`>`} RTA {`>`} 영웅의 픽률, 승률, 프리밴률, 장비세트,
            아티팩트 채용률을 확인하실 수 있습니다.
          </p>
          <p>2024.09.21 </p>
          <p>영웅상세 {`>`} 영융 빌드가 추가되었습니다.</p>
          <p>668,795건의 영융 빌드 데이터가 추가되었습니다.</p>

          <p className="border-bottom pb-2">
            영웅상세 {`>`} BUILDS {`>`} 장비세트를 선택하면 세트에 맞는
            스탯,아티팩트 채용률을 확인하실 수 있습니다.
          </p>
          <p> 2024.09.19</p>
          <p className="border-bottom pb-2">
            미궁 시뮬레이터 기능이 추가되었습니다.
          </p>
          <p>2024.09.18</p>
          <p className="border-bottom pb-2">
            영웅 목록 페이지가 추가되었습니다.
          </p>
          <p>2024.09.17</p>
          <p>Epic7GG(에픽지지) OPEN</p> */}
        </div>
      </div>
    </>
  );
}
