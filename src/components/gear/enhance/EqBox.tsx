import CoImage from "@/components/common/CoImages";
import { ISelectedOption, IOption } from "@/modules/gear/gearEnhance";

export default function EqBox({
  selectedOption,
  enhanceCount,
}: {
  selectedOption: ISelectedOption;
  enhanceCount: number;
}) {
  const imgUrl = import.meta.env.VITE_ASSETS_URL;
  const { parts, mainOption, subOption1, subOption2, subOption3, subOption4 } =
    selectedOption;

  const mainOptionValue = () => {
    switch (mainOption.key) {
      case "atkPercentage":
      case "hpPercentage":
      case "defPercentage":
      case "eff":
      case "efr":
        if (enhanceCount === 1) return "19%";
        else if (enhanceCount === 2) return "26%";
        else if (enhanceCount === 3) return "34%";
        else if (enhanceCount === 4) return "43%";
        else if (enhanceCount === 5) return "60%";
        else return mainOption.value;
      case "atk":
        if (enhanceCount === 1) return "160";
        else if (enhanceCount === 2) return "220";
        else if (enhanceCount === 3) return "280";
        else if (enhanceCount === 4) return "360";
        else if (enhanceCount === 5) return "500";
        else return mainOption.value;
      case "hp":
        if (enhanceCount === 1) return "864";
        else if (enhanceCount === 2) return "1188";
        else if (enhanceCount === 3) return "1512";
        else if (enhanceCount === 4) return "1944";
        else if (enhanceCount === 5) return "2700";
        else return mainOption.value;
      case "def":
        if (enhanceCount === 1) return "96";
        else if (enhanceCount === 2) return "132";
        else if (enhanceCount === 3) return "168";
        else if (enhanceCount === 4) return "216";
        else if (enhanceCount === 5) return "300";
        else return mainOption.value;
      case "chd":
        if (enhanceCount === 1) return "21%";
        else if (enhanceCount === 2) return "29%";
        else if (enhanceCount === 3) return "36%";
        else if (enhanceCount === 4) return "47%";
        else if (enhanceCount === 5) return "65%";
        else return mainOption.value;
      case "chc":
        if (enhanceCount === 1) return "18%";
        else if (enhanceCount === 2) return "24%";
        else if (enhanceCount === 3) return "31%";
        else if (enhanceCount === 4) return "40%";
        else if (enhanceCount === 5) return "55%";
        else return mainOption.value;
      case "spd":
        if (enhanceCount === 1) return "12";
        else if (enhanceCount === 2) return "17";
        else if (enhanceCount === 3) return "22";
        else if (enhanceCount === 4) return "28";
        else if (enhanceCount === 5) return "40";
        else return mainOption.value;
      default:
        break;
    }
  };
  const renderSubOption = (subOption: IOption) => {
    const hasPercentage = subOption.value.includes("%");
    let displayValue: string = "";
    let displayAddValue: string | null = null;

    if (hasPercentage) {
      const numericValue = parseInt(subOption.value) || 0;
      const numericAddValue = Math.floor(subOption.addValue || 0);
      const totalValue = numericValue + numericAddValue;
      displayValue = totalValue > 0 ? totalValue + "%" : "";
      if (numericAddValue > 0) {
        displayAddValue = `(+${numericAddValue}%)`;
      }
    } else {
      const numericValue = parseInt(subOption.value) || 0;
      const numericAddValue = Math.floor(subOption.addValue || 0);
      const totalValue = numericValue + numericAddValue;
      displayValue = totalValue > 0 ? totalValue.toString() : "";
      if (numericAddValue > 0) {
        displayAddValue = `(+${numericAddValue})`;
      }
    }

    return (
      <div className="sub-option">
        <span>{subOption.label.replace("%", "") || ""}</span>
        <div>
          <span>{displayValue}</span>
          {displayAddValue && (
            <span className="add-value">{displayAddValue}</span>
          )}
        </div>
      </div>
    );
  };

  const renderEnhaceHeader = () => {
    let partNm,
      eqDesc,
      epNm = "";
    if (parts === "weapon") {
      partNm = "무기";
      epNm = `어비스 드레이크\n뼈날검`;
      eqDesc = `희귀한 어비스 드레이크의 뼈로\n벼렸다는 검`;
    } else if (parts === "helm") {
      partNm = "투구";
      epNm = "어비스 드레이크\n페이스";
      eqDesc = `희귀한 늪마물의 정수로 만든 투구`;
    } else if (parts === "armor") {
      partNm = "갑옷";
      epNm = "어비스 드레이크\n가죽갑옷";
      eqDesc = `희귀한 어비스 드레이크의 정수를\n바른 가죽갑옷`;
    } else if (parts === "ring") {
      partNm = "반지";
      epNm = "자각룡의 홍옥";
      eqDesc = `자각룡의 숨결을 가두고 있는\n진귀한 홍옥`;
    } else if (parts === "neck") {
      partNm = "목걸이";
      epNm = "심연의 칼날 목걸이";
      eqDesc = `지저의 나락에서 채굴한 칼날로\n만든 목걸이`;
    } else if (parts === "boot") {
      partNm = "신발";
      epNm = "어비스 드레이크\n부츠";
      eqDesc = `희귀한 늪마물의 정수로 만든 부츠`;
    }
    return (
      <div className="gear-enhance-header">
        <div className="item-wrap">
          <CoImage
            className="item-bg"
            src="/images/gear/item_bg.png"
            alt="box"
          />
          <CoImage
            className="item-icon"
            src={`/images/gear/eq_${parts}.png`}
            alt="box"
          />
          <div className="enhance-count">
            {enhanceCount > 0 && enhanceCount < 5 && (
              <em
                className="flag flag-orange"
                style={{ marginLeft: enhanceCount < 4 ? "5px" : "" }}
              >{`+${enhanceCount * 3}`}</em>
            )}
            {enhanceCount === 5 && (
              <em className="flag flag-red">{`+${enhanceCount * 3}`}</em>
            )}
          </div>
          <div className="item-text-wrap">
            <span className="item-grade">전설{partNm}</span>
            <span className="item-name">{epNm}</span>
          </div>{" "}
          <img
            className="set-icon"
            src={`${imgUrl}/set/set_speed.png`}
            alt="set_speed"
          />
        </div>
        <div className="item-desc">{eqDesc}</div>
      </div>
    );
  };

  return (
    <>
      <div className="gear-enhance-box">
        <CoImage
          className="box_equip"
          src="/images/gear/box_equip_1.png"
          alt="box"
        />
        {renderEnhaceHeader()}
        <div className="gear-enhance-option">
          <div className="bar-wrap">
            <CoImage className="bar_1" src="/images/gear/bar.png" alt="bar" />
            <CoImage className="bar_2" src="/images/gear/bar.png" alt="bar" />
          </div>
          <div className="main-option">
            <div>
              <img
                className="stat-icon"
                src={`${imgUrl}stat/${selectedOption.mainOption.key.replace("Percentage", "")}.png`}
                alt={selectedOption.mainOption.key}
              />
              {mainOption.label.replace("%", "")}
            </div>
            <span>{mainOptionValue()}</span>
          </div>
          {renderSubOption(subOption1)}
          {renderSubOption(subOption2)}
          {renderSubOption(subOption3)}
          {renderSubOption(subOption4)}
          <div className="gear-score">
            <span>장비점수</span>
            <span>-</span>
          </div>
        </div>
        <div className="gear-enhance-desc">
          <div className="set-icon-wrap">
            <img
              className="set-icon"
              src={`${imgUrl}/set/set_speed.png`}
              alt="set_speed"
            />
            <span>속도의 세트 (0/4)</span>
          </div>
          <div className="set-desc">속도가 25% 증가합니다.</div>
        </div>
      </div>
    </>
  );
}
