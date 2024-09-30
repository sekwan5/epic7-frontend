import { PageTitle } from "@/components/common/PageTitle";
import { Option, SelectBox } from "@/components/common/SelectBox";
import EqBox from "@/components/gear/enhance/EqBox";
import { useState } from "react";
import { options2 } from "../owner/hook";

interface IOption {
  key: string;
  value: string;
  label: string;
}

export interface ISelectedOption {
  parts: string;
  mainOption: IOption;
  subOption1: IOption;
  subOption2: IOption;
  subOption3: IOption;
  subOption4: IOption;
}

export default function GearEnhanceWrap() {
  const [enhanceOptions, setEnhanceOptions] = useState<ISelectedOption>({
    parts: "weapon",
    mainOption: { key: "", label: "", value: "" },
    subOption1: { key: "", label: "", value: "" },
    subOption2: { key: "", label: "", value: "" },
    subOption3: { key: "", label: "", value: "" },
    subOption4: { key: "", label: "", value: "" },
  });
  const [selectedOption, setSelectedOption] = useState<ISelectedOption>({
    parts: "weapon",
    mainOption: { key: "", label: "", value: "" },
    subOption1: { key: "", label: "", value: "" },
    subOption2: { key: "", label: "", value: "" },
    subOption3: { key: "", label: "", value: "" },
    subOption4: { key: "", label: "", value: "" },
  });

  const handleChange = (event: Option | null, index?: number) => {
    if (index === undefined) {
      setSelectedOption((prevValue) => ({
        ...prevValue,
        parts: event?.value ?? "",
      }));
      setEnhanceOptions((prevValue) => ({
        ...prevValue,
        parts: event?.value ?? "",
      }));
    } else {
      switch (index) {
        case 0:
          setSelectedOption((prevValue) => ({
            ...prevValue,
            mainOption: {
              ...prevValue.mainOption,
              key: event?.value ?? "",
              label: event?.label ?? "",
            },
          }));
          setEnhanceOptions((prevValue) => ({
            ...prevValue,
            mainOption: {
              ...prevValue.mainOption,
              key: event?.value ?? "",
              label: event?.label ?? "",
            },
          }));

          break;
        case 1:
          setSelectedOption((prevValue) => ({
            ...prevValue,
            subOption1: {
              ...prevValue.subOption1,
              key: event?.value ?? "",
              label: event?.label ?? "",
            },
          }));
          break;

        default:
          break;
      }
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newValue = event.target.value.replace(/[^0-9%]/g, "");
    switch (index) {
      case 0:
        setSelectedOption((prevValue) => ({
          ...prevValue,
          mainOption: {
            ...prevValue.mainOption,
            value: newValue,
          },
        }));
        setEnhanceOptions((prevValue) => ({
          ...prevValue,
          mainOption: {
            ...prevValue.mainOption,
            value: newValue,
          },
        }));

        break;
      case 1:
        setSelectedOption((prevValue) => ({
          ...prevValue,
          subOption1: {
            ...prevValue.subOption1,
            value: newValue,
          },
        }));
        break;

      default:
        break;
    }
    // setValue((prevValue) => ({
    //   ...prevValue,
    //   parsedData: prevValue.parsedData.map((item, i) =>
    //     i === index ? { ...item, value: newValue } : item,
    //   ),
    // }));
  };
  const partsOptions = [
    { value: "weapon", label: "무기" },
    { value: "helm", label: "투구" },
    { value: "armor", label: "갑옷" },
    { value: "neck", label: "목걸이" },
    { value: "ring", label: "반지" },
    { value: "boot", label: "신발" },
  ];
  return (
    <>
      <div className="container gear-enhance">
        <div className="gear-enhance-wrap">
          <PageTitle depth="gear">
            <h2>장비 강화 시뮬레이터</h2>
          </PageTitle>
          <div className="gear-enhance-content">
            <EqBox selectedOption={enhanceOptions} />
            <div className="select-box-wrap">
              <SelectBox
                options={partsOptions}
                label="부위"
                value={selectedOption.parts ?? ""}
                onChange={(e) => handleChange(e)}
                useInput={false}
              />
              <SelectBox
                options={options2}
                label="주옵션"
                value={selectedOption.mainOption.key ?? ""}
                inputValue={selectedOption.mainOption.value ?? ""}
                onChange={(e) => handleChange(e, 0)}
                handleInputChange={(e) => handleInputChange(e, 0)}
              />
              {/*
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
              /> */}
              <div className="enhance-button-wrap">
                <button
                  className="enhance-button-1 "
                  // onClick={handleImageSelectClick}
                >
                  강화
                </button>
                <button
                  className="enhance-button-2 "
                  // onClick={() => recommendHeroes(value)}
                >
                  자동생성
                </button>
                <button
                  className="enhance-button-3 "
                  // onClick={() => recommendHeroes(value)}
                >
                  판매
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
