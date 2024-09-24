import { PageTitle } from "@/components/common/PageTitle";
import ImageToText from "@/components/gear/owner/ImageToText";
import { useState } from "react";
// import { SelectBoxGroup } from "./OptionSelectBox";

export function GearOwnerWrap() {
  const [text, setText] = useState<string>("텍스트가 여기에 표시됩니다.");
  // const [searchMethod, setSearchMethod] = useState<number>(0); // 기본값을 "장비 찾기"로 설정

  // const handleSearchMethodChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setSearchMethod(Number(event.target.value)); // value를 숫자로 변경
  // };

  return (
    <>
      <div className="container gear-owner">
        <div className="gear-owner-wrap">
          <PageTitle>
            <h2>장비 주인찾기</h2>
          </PageTitle>
          {/* <div className="search-method">
            <label htmlFor="gear-method">
              <input
                id="gear-method"
                type="radio"
                value={0} // 숫자로 변경
                checked={searchMethod === 0}
                onChange={handleSearchMethodChange}
              />
              장비 찾기
            </label>
            <label htmlFor="image-method">
              <input
                id="image-method"
                type="radio"
                value={1} // 숫자로 변경
                checked={searchMethod === 1}
                onChange={handleSearchMethodChange}
              />
              이미지로 찾기 (BETA)
            </label>
          </div> */}
          <div className="gear-owner-content">
            <>
              <ImageToText setText={setText} />
              <textarea
                value={text}
                readOnly
                style={{ width: "100%", height: "200px", marginTop: "10px" }}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
}
