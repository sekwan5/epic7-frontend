import CoImage from "@/components/common/CoImages";
import { ISelectedOption } from "@/modules/gear/gearEnhance";

export default function EqBox({
  selectedOption,
}: {
  selectedOption: ISelectedOption;
}) {
  const imgUrl = import.meta.env.VITE_ASSETS_URL;

  return (
    <>
      <div className="gear-enhance-box">
        <CoImage
          className="box_equip"
          src="/images/gear/box_equip_1.png"
          alt="box"
        />
        <div className="gear-enhance-header">
          <div className="item-wrap">
            <CoImage
              className="item-bg"
              src="/images/gear/item_bg.png"
              alt="box"
            />
            <CoImage
              className="item-icon"
              src={`/images/gear/eq_${selectedOption.parts}.png`}
              alt="box"
            />
            <div className="item-text-wrap">
              <span className="item-grade">전설무기</span>
              <span className="item-name">{`어비스 드레이크 \n 뼈날검`}</span>
            </div>
            <img
              className="set-icon"
              src={`${imgUrl}/set/set_speed.png`}
              alt="set_speed"
            />
          </div>
          <div className="item-desc">{`희귀한 어비스 드레이크의 뼈로\n벼렸다는 검`}</div>
        </div>
        <div className="gear-enhance-option">
          <div className="bar-wrap">
            <CoImage className="bar_1" src="/images/gear/bar.png" alt="bar" />
            <CoImage className="bar_2" src="/images/gear/bar.png" alt="bar" />
          </div>
          <div className="main-option">
            <span>{selectedOption.mainOption.label}</span>
            <span>{selectedOption.mainOption.value}</span>
          </div>
          <div className="sub-option">
            <span>{selectedOption.subOption1.label}</span>
            <span>{selectedOption.subOption1.value}</span>
          </div>
          <div className="sub-option">
            <span>{selectedOption.subOption2.label}</span>
            <span>{selectedOption.subOption2.value}</span>
          </div>
          <div className="sub-option">
            <span>{selectedOption.subOption3.label}</span>
            <span>{selectedOption.subOption3.value}</span>
          </div>
          <div className="sub-option">
            <span>{selectedOption.subOption4.label}</span>
            <span>{selectedOption.subOption4.value}</span>
          </div>
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
