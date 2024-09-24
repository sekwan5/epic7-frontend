import React, { useState } from "react";

// SelectBox 컴포넌트
interface SelectBoxProps {
  options: string[];
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectBox({ options, label, value, onChange }: SelectBoxProps) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// SelectBox가 6개 나오는 컴포넌트
export function SelectBoxGroup() {
  const [selectValues, setSelectValues] = useState(Array(6).fill(""));

  // 각 SelectBox에서 사용할 옵션 리스트
  const optionList1 = ["Option 1"]; // 첫 번째 SelectBox에만 사용
  const optionList2 = ["Option 2", "Option 3"]; // 두 번째와 세 번째 SelectBox에 사용
  const optionList3 = ["Option 4", "Option 5", "Option 6", "Option 7"]; // 네 번째부터 여섯 번째 SelectBox에 사용

  const optionSets = [
    optionList1, // 첫 번째 SelectBox
    optionList2, // 두 번째 SelectBox
    optionList2, // 세 번째 SelectBox
    optionList3, // 네 번째 SelectBox
    optionList3, // 다섯 번째 SelectBox
    optionList3, // 여섯 번째 SelectBox
  ];
  const labels = ["세트", "부위", "주옵션", "부옵션"];

  const handleSelectChange =
    (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newValues = [...selectValues];
      newValues[index] = event.target.value;
      setSelectValues(newValues);
    };

  return (
    <div>
      <h2>SelectBox Group</h2>
      {optionSets.map((options, index) => (
        <SelectBox
          key={index}
          label={index < 3 ? labels[index] : labels[3]}
          options={options}
          value={selectValues[index]}
          onChange={handleSelectChange(index)}
        />
      ))}
    </div>
  );
}
