import { PageTitle } from "@/components/common/PageTitle";
import { Option, SelectBox } from "@/components/common/SelectBox";
import { useRef, useState } from "react";
import {
  geOptionValueToName,
  gePartValueToName,
  geSetValueToName,
  options1,
  options2,
} from "./hook";
import {
  ImageToText,
  ImageToTextRef,
  IParseData,
} from "@/components/gear/owner/ImageToText";
// import { GearRecommendation } from "@/modules/api/hero"; // 새로운 인터페이스 import
import { api } from "@/modules/api";
import HeroFilter from "@/components/hero/heroList/HeroFilter";
import HeroGrid from "@/components/hero/heroList/HeroGrid";
import { getHeroesByIds, IHero } from "@/modules/data/getHeroData";
import { partsOptions } from "../gearEnhance";

export function GearOwnerWrap() {
  // const [recommendations, setRecommendations] =
  //   useState<GearRecommendation | null>(null);
  const [data, setData] = useState<IHero[]>([]);
  const imageToTextRef = useRef<ImageToTextRef>(null);
  const recommendHeroes = async (value: IParseData) => {
    console.log(data);

    if (value.set === "" || value.part === "") {
      alert("세트와 부위를 선택해주세요.");
      return;
    }

    try {
      const result = await api.hero.recommendHeroes(value);
      const heroIds = result.recommendations.map((hero) => hero.hero_id);
      const heroes = getHeroesByIds(heroIds, false);
      const tmp = heroes.map((hero) => {
        return {
          ...hero,
          isShow: true,
        };
      });
      setData(tmp);
    } catch (error) {
      console.error("영웅 추천 중 오류 발생:", error);
    }
  };

  const setParseData = async (data: IParseData) => {
    console.log(data);
    data.parsedData = data.parsedData.map((item) => ({
      ...item,
      key: geOptionValueToName(item.key as string) || "", // 기본값 제공
      value: item.value.replace(/[^가-힣a-zA-Z0-9%]/g, "").trim(),
    }));

    while (data.parsedData.length < 5) {
      data.parsedData.push({ key: "", value: "" });
    }

    const newSet = geSetValueToName(data.set || "") || ""; // 기본값 제공
    const newPart = gePartValueToName(data.part || "") || ""; // 기본값 제공
    // 세트 값 업데이트
    handleChange({ value: newSet, label: data.set || "" }, undefined, "set");
    handleChange({ value: newPart, label: data.part || "" }, undefined, "part");

    // 각 옵션 값 업데이트
    data.parsedData.forEach((item, index) => {
      handleChange({ value: item.key || "", label: item.key || "" }, index); // 기본값 제공
      handleInputChange(
        {
          target: {
            value: item.value.replace(/[^가-힣a-zA-Z0-9%]/g, "").trim(),
          },
        } as React.ChangeEvent<HTMLInputElement>,
        index,
      );
    });

    // setValue({
    //   set: newSet,
    //   part: newPart,
    //   parsedData: data.parsedData,
    // });

    // await recommendHeroes(data);
  };

  const [value, setValue] = useState<IParseData>({
    parsedData: [
      { key: "", value: "", flag: "main" },
      { key: "", value: "", flag: "sub1" },
      { key: "", value: "", flag: "sub2" },
      { key: "", value: "", flag: "sub3" },
      { key: "", value: "", flag: "sub4" },
    ],
    set: "",
    part: "",
  });
  const handleImageSelectClick = () => {
    imageToTextRef.current?.handleFileButtonClick();
  };
  const handleChange = (
    event: Option | null,
    index?: number,
    flag?: string,
  ) => {
    if (index === undefined) {
      if (flag === "set") {
        setValue((prevValue) => ({ ...prevValue, set: event?.value ?? "" }));
      }
      if (flag === "part") {
        setValue((prevValue) => ({ ...prevValue, part: event?.value ?? "" }));
      }
    } else {
      setValue((prevValue) => ({
        ...prevValue,
        parsedData: prevValue.parsedData.map((item, i) =>
          i === index ? { ...item, key: event?.value ?? "" } : item,
        ),
      }));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newValue = event.target.value.replace(/[^0-9%]/g, "");
    setValue((prevValue) => ({
      ...prevValue,
      parsedData: prevValue.parsedData.map((item, i) =>
        i === index ? { ...item, value: newValue } : item,
      ),
    }));
  };

  return (
    <>
      <div className="container gear-owner">
        <div className="gear-owner-wrap">
          <PageTitle depth="gear">
            <h2>장비 주인찾기</h2>
          </PageTitle>
          <div className="gear-owner-content">
            <div className="select-box-wrap">
              <SelectBox
                options={options1}
                label="세트"
                value={value.set ?? ""}
                onChange={(e) => handleChange(e, undefined, "set")}
                useInput={false}
              />
              <SelectBox
                options={partsOptions}
                label="부위"
                value={value.part ?? ""}
                onChange={(e) => handleChange(e, undefined, "part")}
                useInput={false}
              />
              <SelectBox
                options={options2}
                label="주옵션"
                value={value.parsedData[0].key ?? ""}
                inputValue={value.parsedData[0].value ?? ""}
                onChange={(e) => handleChange(e, 0)}
                handleInputChange={(e) => handleInputChange(e, 0)}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.parsedData[1].key ?? ""}
                inputValue={value.parsedData[1].value ?? ""}
                onChange={(e) => handleChange(e, 1)}
                handleInputChange={(e) => handleInputChange(e, 1)}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.parsedData[2].key ?? ""}
                inputValue={value.parsedData[2].value ?? ""}
                onChange={(e) => handleChange(e, 2)}
                handleInputChange={(e) => handleInputChange(e, 2)}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.parsedData[3].key ?? ""}
                inputValue={value.parsedData[3].value ?? ""}
                onChange={(e) => handleChange(e, 3)}
                handleInputChange={(e) => handleInputChange(e, 3)}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.parsedData[4].key ?? ""}
                inputValue={value.parsedData[4].value ?? ""}
                onChange={(e) => handleChange(e, 4)}
                handleInputChange={(e) => handleInputChange(e, 4)}
              />
              <div className="d-flex gap-2">
                <button
                  className="select-image-button"
                  onClick={handleImageSelectClick}
                >
                  이미지선택
                </button>
                <button
                  className="hero-search-button"
                  onClick={() => recommendHeroes(value)}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="img-to-text-wrap">
              <ImageToText setParseData={setParseData} ref={imageToTextRef} />
            </div>
          </div>
        </div>
        <div className="hero-list">
          <HeroFilter data={data} setData={setData} />
          <HeroGrid data={data} setData={setData} />
        </div>
      </div>
    </>
  );
}
