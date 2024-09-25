import { PageTitle } from "@/components/common/PageTitle";
import { SelectBox } from "@/components/common/SelectBox";
import { useState } from "react";
import { geOptionValueToName, options1, options2 } from "./hook";
import { ImageToText, IParseData } from "@/components/gear/owner/ImageToText";

export function GearOwnerWrap() {
  // const [parsData, setParseData] = useState<string>("텍스트가 여기에 표시됩니다.");
  // const [searchMethod, setSearchMethod] = useState<number>(0); // 기본값을 "장비 찾기"로 설정

  const setParseData = (data: IParseData) => {
    setValue({
      set: { key: "", value: "" },
      main: {
        key: geOptionValueToName(data.parsedData[0].key),
        value: data.parsedData[0].value,
      },
      sub1: {
        key: geOptionValueToName(data.parsedData[1].key),
        value: data.parsedData[1].value,
      },
      sub2: {
        key: geOptionValueToName(data.parsedData[2].key),
        value: data.parsedData[2].value,
      },
      sub3: {
        key: geOptionValueToName(data.parsedData[3].key),
        value: data.parsedData[3].value,
      },
      sub4: {
        key: geOptionValueToName(data.parsedData[4].key),
        value: data.parsedData[4].value,
      },
    });
  };
  const [value, setValue] = useState({
    set: { key: "", value: "" },
    main: { key: "", value: "" },
    sub1: { key: "", value: "" },
    sub2: { key: "", value: "" },
    sub3: { key: "", value: "" },
    sub4: { key: "", value: "" },
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
                value={value.set.key}
                onChange={handleChange}
                useInput={false}
              />
              <SelectBox
                options={options2}
                label="주옵션"
                value={value.main.key}
                inputValue={value.main.value}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.sub1.key}
                inputValue={value.sub1.value}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.sub2.key}
                inputValue={value.sub2.value}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.sub3.key}
                inputValue={value.sub3.value}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
              <SelectBox
                options={options2}
                label="부옵션"
                value={value.sub4.key}
                inputValue={value.sub4.value}
                onChange={handleChange}
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
