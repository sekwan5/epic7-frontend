import { PageTitle } from "@/components/common/PageTitle";
import { Option, SelectBox } from "@/components/common/SelectBox";
import EqBox from "@/components/gear/enhance/EqBox";
import { useState } from "react";
import { options2, options3 } from "../owner/hook";
import { enhanceGear, generateAutoOption } from "./hook";

export interface IOption {
  key: string;
  value: string;
  label: string;
  count?: number;
  addValue?: number;
}

export interface ISelectedOption {
  parts: string;
  mainOption: IOption;
  subOption1: IOption;
  subOption2: IOption;
  subOption3: IOption;
  subOption4: IOption;
}

const initialOption: IOption = {
  key: "",
  label: "",
  value: "",
  count: 0,
  addValue: 0,
};

const initialSelectedOption: ISelectedOption = {
  parts: "weapon",
  mainOption: { key: "atk", label: "공격력", value: "100" },
  subOption1: initialOption,
  subOption2: initialOption,
  subOption3: initialOption,
  subOption4: initialOption,
};

const baseOption = {
  weapon: { key: "atk", label: "공격력", value: "100" },
  helm: { key: "hp", label: "생명력", value: "540" },
  armor: { key: "def", label: "방어력", value: "60" },
  neck: { key: "chd", label: "치명피해", value: "12%" },
  ring: { key: "atk", label: "공격력", value: "12%" },
  boot: { key: "spd", label: "속도", value: "8" },
};

const partsOptions = [
  { value: "weapon", label: "무기" },
  { value: "helm", label: "투구" },
  { value: "armor", label: "갑옷" },
  { value: "neck", label: "목걸이" },
  { value: "ring", label: "반지" },
  { value: "boot", label: "신발" },
];

export default function GearEnhanceWrap() {
  // const [enhanceOptions, setEnhanceOptions] = useState<ISelectedOption>(
  //   initialSelectedOption,
  // );
  const [selectedOption, setSelectedOption] = useState<ISelectedOption>(
    initialSelectedOption,
  );
  const [enhanceCount, setEnhanceCount] = useState(0);
  const [resultOption, setResultOption] = useState<ISelectedOption[]>([]);

  const handleChange = (event: Option | null, index?: number) => {
    if (index === undefined) {
      handlePartsChange(event);
    } else {
      handleOptionChange(event, index);
    }
  };

  const handlePartsChange = (event: Option | null) => {
    const partValue = event?.value ?? "";
    const newMainOption = getMainOptionForPart(partValue);
    const updateOption = (prevValue: ISelectedOption) => ({
      ...prevValue,
      parts: partValue,
      mainOption: newMainOption,
      subOption1: initialOption,
      subOption2: initialOption,
      subOption3: initialOption,
      subOption4: initialOption,
    });

    setSelectedOption(updateOption);
    // setEnhanceOptions(updateOption);
  };

  const getMainOptionForPart = (part: string): IOption => {
    return baseOption[part as keyof typeof baseOption] || initialOption;
  };

  const handleOptionChange = (event: Option | null, index: number) => {
    const newOption = {
      key: event?.value ?? "",
      label: event?.label ?? "",
    };

    const updateOption = (prevValue: ISelectedOption) => {
      if (index === 0) {
        return {
          ...prevValue,
          mainOption: { ...prevValue.mainOption, ...newOption },
        };
      } else {
        const optionKey = `subOption${index}` as keyof ISelectedOption;
        return {
          ...prevValue,
          [optionKey]: { ...(prevValue[optionKey] as IOption), ...newOption },
        };
      }
    };

    setSelectedOption(updateOption);
    // setEnhanceOptions(updateOption);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newValue = event.target.value.replace(/[^0-9%]/g, "");

    const updateOption = (prevValue: ISelectedOption) => {
      if (index === 0) {
        return {
          ...prevValue,
          mainOption: { ...prevValue.mainOption, value: newValue },
        };
      } else {
        const optionKey = `subOption${index}` as keyof ISelectedOption;
        return {
          ...prevValue,
          [optionKey]: {
            ...(prevValue[optionKey] as IOption),
            value: newValue,
          },
        };
      }
    };

    setSelectedOption(updateOption);
    // setEnhanceOptions(updateOption);
  };
  const handleAutoGenerate = () => {
    if (enhanceCount < 5) {
      setResultOption((prevOptions) => [...prevOptions, selectedOption]);
    }
    const autoGeneratedOption = generateAutoOption(selectedOption.parts);
    setEnhanceCount(0);
    setSelectedOption(autoGeneratedOption);

    // setEnhanceOptions(autoGeneratedOption);
  };

  const handleEnhance = () => {
    const subOptions = [
      selectedOption.subOption1,
      selectedOption.subOption2,
      selectedOption.subOption3,
      selectedOption.subOption4,
    ];

    // 모든 부옵션이 유효한지 확인 (key와 value가 모두 비어있지 않아야 함)
    const allSubOptionsValid = subOptions.every(
      (option) => option.key !== "" && option.value !== "",
    );

    if (!allSubOptionsValid) {
      alert("모든 부옵션을 선택해주세요.");
      return;
    }

    // 현재 강화 횟수 계산
    const currentEnhanceCount = subOptions.reduce(
      (sum, option) => sum + (option.count || 0),
      0,
    );

    // 강화 횟수가 5회 이상이면 더 이상 강화할 수 없음
    if (currentEnhanceCount >= 5) {
      return;
    }

    const enhancedOption = enhanceGear(selectedOption);
    setSelectedOption(enhancedOption);

    // 강화 후 총 강화 횟수 계산
    const newEnhanceCount = [
      enhancedOption.subOption1,
      enhancedOption.subOption2,
      enhancedOption.subOption3,
      enhancedOption.subOption4,
    ].reduce((sum, option) => sum + (option.count || 0), 0);
    setEnhanceCount(newEnhanceCount);

    if (newEnhanceCount === 5) {
      setResultOption((prevOptions) => [...prevOptions, enhancedOption]);
    }
  };

  const handleReset = () => {
    if (enhanceCount > 0 && enhanceCount < 5) {
      setResultOption((prevOptions) => [...prevOptions, selectedOption]);
    }
    setSelectedOption((prevState) => ({
      ...prevState,
      subOption1: { ...prevState.subOption1, count: 0, addValue: 0 },
      subOption2: { ...prevState.subOption2, count: 0, addValue: 0 },
      subOption3: { ...prevState.subOption3, count: 0, addValue: 0 },
      subOption4: { ...prevState.subOption4, count: 0, addValue: 0 },
    }));
    setEnhanceCount(0);
  };

  const calculateStats = () => {
    const totalItems = resultOption.length;

    const calculateSpeed = (option: IOption) => {
      if (option.key !== "spd") return 0;
      const baseSpeed = parseInt(option.value) || 0;
      const addSpeed = parseInt(option.addValue?.toString() || "0") || 0;
      return baseSpeed + addSpeed;
    };

    const calculateRefinedSpeed = (option: IOption) => {
      const speed = calculateSpeed(option);
      const refinementBonus = option.count === 5 ? 4 : option.count || 0;
      return speed + refinementBonus;
    };

    const beforeRefinement = resultOption.map((item) => {
      const speeds = [
        item.subOption1,
        item.subOption2,
        item.subOption3,
        item.subOption4,
      ]
        .map(calculateSpeed)
        .filter((speed) => speed > 0);
      const maxSpeed = Math.max(...speeds, 0);
      return {
        speedAbove14: maxSpeed >= 14,
        speedAbove15: maxSpeed >= 15,
        speedAbove16: maxSpeed >= 16,
        speedAbove17: maxSpeed >= 17,
        speedAbove18: maxSpeed >= 18,
        speedAbove19: maxSpeed >= 19,
      };
    });

    const afterRefinement = resultOption.map((item) => {
      const refinedSpeeds = [
        item.subOption1,
        item.subOption2,
        item.subOption3,
        item.subOption4,
      ]
        .map(calculateRefinedSpeed)
        .filter((speed) => speed > 0);
      const maxRefinedSpeed = Math.max(...refinedSpeeds, 0);
      return {
        speedAbove18: maxRefinedSpeed >= 18,
        speedAbove19: maxRefinedSpeed >= 19,
        speedAbove20: maxRefinedSpeed >= 20,
        speedAbove21: maxRefinedSpeed >= 21,
        speedAbove22: maxRefinedSpeed >= 22,
        speedAbove23: maxRefinedSpeed >= 23,
        speedAbove24: maxRefinedSpeed >= 24,
      };
    });

    const countStats = (items: { [key: string]: boolean }[], key: string) =>
      items.filter((item) => item[key]).length;

    const beforeStats = {
      speedAbove14: countStats(beforeRefinement, "speedAbove14"),
      speedAbove15: countStats(beforeRefinement, "speedAbove15"),
      speedAbove16: countStats(beforeRefinement, "speedAbove16"),
      speedAbove17: countStats(beforeRefinement, "speedAbove17"),
      speedAbove18: countStats(beforeRefinement, "speedAbove18"),
      speedAbove19: countStats(beforeRefinement, "speedAbove19"),
    };

    const afterStats = {
      speedAbove18: countStats(afterRefinement, "speedAbove18"),
      speedAbove19: countStats(afterRefinement, "speedAbove19"),
      speedAbove20: countStats(afterRefinement, "speedAbove20"),
      speedAbove21: countStats(afterRefinement, "speedAbove21"),
      speedAbove22: countStats(afterRefinement, "speedAbove22"),
      speedAbove23: countStats(afterRefinement, "speedAbove23"),
    };

    const speedAbove24 = countStats(afterRefinement, "speedAbove24");

    const calculateProbability = (count: number) =>
      totalItems > 0 ? ((count / totalItems) * 100).toFixed(2) : "0";

    return {
      totalItems,
      before: Object.fromEntries(
        Object.entries(beforeStats).map(([key, value]) => [
          key,
          {
            count: value,
            probability: calculateProbability(value),
          },
        ]),
      ),
      after: Object.fromEntries(
        Object.entries(afterStats).map(([key, value]) => [
          key,
          {
            count: value,
            probability: calculateProbability(value),
          },
        ]),
      ),
      speedAbove24: {
        count: speedAbove24,
        probability: calculateProbability(speedAbove24),
      },
    };
  };

  const stats = calculateStats();

  return (
    <div className="container gear-enhance">
      <div className="gear-enhance-wrap">
        <PageTitle depth="gear">
          <h2>장비 강화 시뮬레이터</h2>
        </PageTitle>
        <div className="gear-enhance-content">
          <EqBox selectedOption={selectedOption} enhanceCount={enhanceCount} />
          <div className="select-box-wrap">
            <SelectBox
              classNm="parts-select"
              options={partsOptions}
              label="부위"
              value={selectedOption.parts}
              onChange={(e) => handleChange(e)}
              useInput={false}
            />
            <SelectBox
              options={options2}
              label="주옵션"
              disabled={
                ["weapon", "helm", "armor"].includes(selectedOption.parts) ||
                enhanceCount > 0
              }
              value={selectedOption.mainOption.key}
              inputValue={selectedOption.mainOption.value}
              onChange={(e) => handleChange(e, 0)}
              handleInputChange={(e) => handleInputChange(e, 0)}
            />
            {[1, 2, 3, 4].map((index) => {
              const subOptionKey = `subOption${index}` as keyof ISelectedOption;
              const subOption = selectedOption[subOptionKey] as IOption;
              return (
                <SelectBox
                  key={subOptionKey}
                  options={options3}
                  disabled={enhanceCount > 0}
                  label="부옵션"
                  value={subOption.key}
                  inputValue={subOption.value}
                  onChange={(e) => handleChange(e, index)}
                  handleInputChange={(e) => handleInputChange(e, index)}
                />
              );
            })}
            <div className="enhance-button-wrap">
              <button className="enhance-button-1" onClick={handleEnhance}>
                강화
              </button>
              <button className="enhance-button-3" onClick={handleReset}>
                초기화
              </button>
              <button className="enhance-button-2" onClick={handleAutoGenerate}>
                자동생성
              </button>
            </div>
          </div>
          <div className="result-option-wrap">
            <div className="mb-3 text-center">
              <h3>강화 결과 통계</h3>
              <p>총 강화 아이템 수: {stats.totalItems}</p>
              <p>
                재련 후 속도 24 이상: {stats.speedAbove24.count} (확률:{" "}
                {stats.speedAbove24.probability}%)
              </p>
            </div>
            <div className="d-flex justify-content-between gap-3">
              <div className="">
                <h4 className="result-title">재련 전</h4>
                {Object.entries(stats.before).map(([key, value]) => (
                  <p key={key}>
                    속도 {key.replace("speedAbove", "")} 이상 갯수:{" "}
                    {value.count} (확률: {value.probability}%)
                  </p>
                ))}
              </div>
              <div>
                <h4 className="result-title">재련 후</h4>
                {Object.entries(stats.after).map(([key, value]) => (
                  <p key={key}>
                    속도 {key.replace("speedAbove", "")} 이상 : {value.count}{" "}
                    (확률: {value.probability}%)
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
