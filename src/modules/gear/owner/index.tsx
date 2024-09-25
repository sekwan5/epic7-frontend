import { PageTitle } from "@/components/common/PageTitle";
import { SelectBox } from "@/components/common/SelectBox";
import { useState } from "react";
import {
  geOptionValueToName,
  geSetValueToName,
  options1,
  options2,
} from "./hook";
import { ImageToText, IParseData } from "@/components/gear/owner/ImageToText";
// import { GearRecommendation } from "@/modules/api/hero"; // 새로운 인터페이스 import
import { api } from "@/modules/api";
import HeroFilter from "@/components/hero/heroList/HeroFilter";
import HeroGrid from "@/components/hero/heroList/HeroGrid";
import { IHero } from "@/modules/data/getHeroData";

export function GearOwnerWrap() {
  // const [recommendations, setRecommendations] =
  //   useState<GearRecommendation | null>(null);
  const [data, setData] = useState<IHero[]>([]);

  const recommendHeroes = async (data: IParseData) => {
    try {
      const result = await api.hero.recommendHeroes(data);
      console.log(result);
      // setRecommendations(result);
    } catch (error) {
      console.error("Error recommending heroes:", error);
    }
  };

  const setParseData = async (data: IParseData) => {
    // parsedData의 각 항목에 대해 key를 변환
    console.log(data);
    data.parsedData = data.parsedData.map((item) => ({
      ...item,
      key: geOptionValueToName(item.key as string),
    }));

    // parsedData의 길이가 5개 미만이면 빈 객체 추가
    // while (data.parsedData.length < 5) {
    //   data.parsedData.push({ key: "", value: "" });
    // }

    setValue({
      set: geSetValueToName(data.set as string),
      parsedData: data.parsedData,
    });

    // 데이터 설정 후 영웅 추천 실행
    // await recommendHeroes(data);
  };

  const [value, setValue] = useState<IParseData>({
    parsedData: [
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
    ],
    set: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return (
    <>
      <div className="container gear-owner">
        <div className="gear-owner-wrap">
          <PageTitle>
            <h2>장비 주인찾기</h2>
          </PageTitle>
          <div className="gear-owner-content">
            <div className="img-to-text-wrap">
              <ImageToText setParseData={setParseData} />
            </div>
            <div className="select-box-wrap">
              <SelectBox
                options={options1}
                label="세트"
                value={value.set ?? ""}
                onChange={handleChange}
                useInput={false}
              />
              <SelectBox
                options={options2}
                label="주옵션"
                value={value.parsedData[0].key ?? ""}
                inputValue={value.parsedData[0].value ?? ""}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.parsedData[1].key ?? ""}
                inputValue={value.parsedData[1].value ?? ""}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.parsedData[2].key ?? ""}
                inputValue={value.parsedData[2].value ?? ""}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.parsedData[3].key ?? ""}
                inputValue={value.parsedData[3].value ?? ""}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.parsedData[4].key ?? ""}
                inputValue={value.parsedData[4].value ?? ""}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <button onClick={() => recommendHeroes(value)}>찾기</button>
            </div>
            {/* {recommendations && (
              <div className="recommendations">
                <h3>추천 영웅</h3>
                <ul>
                  {recommendations.recommendations.map((rec, index) => (
                    <li key={index}>
                      영웅 ID: {rec.hero_id}, 점수: {rec.score}
                    </li>
                  ))}
                </ul>
                <p>총 추천 수: {recommendations.total_recommendations}</p>
              </div>
            )} */}
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
