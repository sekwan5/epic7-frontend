import { IHero } from "@/modules/api";
import CoImage from "../common/CoImages";

export default function PickBox(props: {
  data: IHero;
  // isBlinking?: boolean;
  // isPick?: boolean;
}) {
  const {
    data,
    // isBlinking = false,
    // isPick = false,
    // useRemove = true,
    // useOutline = true,
    // useBanRate = false,
    // locale,
  } = props;
  // const {
  //     nowPick,
  //     setNowPick,
  //     isFirst,
  //     pickInfo,
  //     setPickInfo,
  //     filteredHeroList,
  //     setFilteredHeroList,
  //     rcmdSynHeroList,
  //     rcmdCounterHeroList,
  //     setRcmdSynHeroList,
  //     setRcmdCounterHeroList,
  // } = useProvider()

  //   const filteredHeroList = mock;

  //   useEffect(() => {
  //     // CSS 애니메이션을 위한 <style> 태그를 동적으로 추가
  //     const styleElement = document.createElement("style");
  //     styleElement.innerHTML = `
  //         @keyframes fadeInOut {
  //             0%, 100% {
  //                 opacity: 1;
  //                 box-shadow: 0 0 8px rgba(255, 255, 255, 0.4), 0 0 16px rgba(255, 255, 255, 0.2);
  //             }
  //             50% {
  //                 opacity: 0;
  //                 box-shadow: 0 0 16px rgba(255, 255, 255, 0.6), 0 0 32px rgba(255, 255, 255, 0.4);
  //             }
  //         }
  //     `;
  //     document.head.appendChild(styleElement);

  //     return () => {
  //       // 컴포넌트가 언마운트될 때 스타일 태그를 제거
  //       document.head.removeChild(styleElement);
  //     };
  //   }, []);

  // function removeHero(hero_id) {
  //     const { updatedPickInfo, removedHero } = resetHero(hero_id)
  //     setPickInfo([...updatedPickInfo])
  //     const tmpFilteredHeroList = filteredHeroList.unshift({
  //         fields: removedHero,
  //     })
  //     const tmpNowPick = searchNowPick(
  //         updatedPickInfo,
  //         isFirst ? fstIdx : sndIdx
  //     )
  //     setNowPick(tmpNowPick)

  //     const { updatedSynHeroList, updatedCounterHeroList } =
  //         updateIsPickedStatus(hero_id)
  //     setRcmdSynHeroList(updatedSynHeroList)
  //     setRcmdCounterHeroList(updatedCounterHeroList)
  // }

  // function resetHero(hero_id) {
  //     let removedHero = null
  //     const updatedPickInfo = pickInfo.map((item) => {
  //         if (item.hero && item.hero.hero_id === hero_id) {
  //             removedHero = item.hero // 제거된 hero를 저장
  //             return { hero: null, isPick: false }
  //         }
  //         return item
  //     })

  //     return { updatedPickInfo, removedHero }
  // }

  // function updateIsPickedStatus(hero_id) {
  //     const updatedSynHeroList = rcmdSynHeroList.map((hero) => {
  //         if (hero && hero.fields && hero.fields.hero_id === hero_id) {
  //             return {
  //                 ...hero,
  //                 isPicked: false,
  //             }
  //         }
  //         return hero
  //     })

  //     const updatedCounterHeroList = rcmdCounterHeroList.map((hero) => {
  //         if (hero && hero.fields && hero.fields.hero_id === hero_id) {
  //             return {
  //                 ...hero,
  //                 isPicked: false,
  //             }
  //         }
  //         return hero
  //     })

  //     return {
  //         updatedSynHeroList,
  //         updatedCounterHeroList,
  //     }
  // }

  const imgUrl = import.meta.env.VITE_ASSETS_URL;
  if (!data) return null;
  return (
    <div className="pick-box">
      {/* {isBlinking && <div className="blinking-background" />} */}
      <CoImage
        className="profile-img"
        src={`${imgUrl}/hero_pick_imgs/${data.id}_l.png`}
        alt="hero"
      />
      <div className="pick-box-content-1 d-flex">
        <CoImage
          className="job-icon"
          src={`${imgUrl}/job/${data.job_id}.png`}
          alt="job"
        />
        <span className="pick-box-name">{data.name}</span>
      </div>

      <div className="pick-box-content-2 d-flex">
        <div>
          <CoImage
            className="type-icon"
            src={`${imgUrl}/type/${data.type_id}.png`}
            alt="type"
          />
        </div>
        <div style={{ position: "relative", top: "2px" }}>
          <CoImage
            className="zodic-icon"
            src={`${imgUrl}/zodiac/${data.zodiac_id}.png`}
            alt="zodiac"
            width={21}
            height={21}
          />
        </div>

        {Array(Number(data.grade))
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              style={{
                marginRight: "-6px",
                alignItems: "center",
              }}
            >
              <CoImage
                className="star-icon"
                src="/icons/star.png" // public 폴더를 기준으로 한 경로
                alt="star"
              />
            </div>
          ))}
      </div>

      {/* {useRemove && (
                        <button
                            style={{
                                ...styles.closeBtn,
                                top: getViewport() == "MO" ? "-4px" : "15px",
                                right: getViewport() == "MO" ? "-1px" : "-10px",
                            }}
                            onClick={() => {
                                removeHero(hero.hero_id)
                            }}
                        >
                            ✕
                        </button>
                    )} */}
    </div>
  );
}
