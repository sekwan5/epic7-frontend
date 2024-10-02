/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  label: string;
  value: string;
  inputValue?: string;
  useInput?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (selectedOption: Option | null) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SelectBox({
  options,
  label,
  value,
  inputValue,
  className,
  onChange,
  handleInputChange,
  useInput = true,
  disabled = false,
}: SelectBoxProps) {
  const selectedOption = options.find((option) => option.value === value);

  const handleChange = (newValue: Option | null) => {
    onChange(newValue);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#36373d",
      borderColor: "rgb(118, 118, 118)",
      color: "#fff",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#ccc",
      fontSize: "13px",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#fff",
      fontSize: "13px",
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#007bff" : "#36373d",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#007bff",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#36373d",
      color: "#fff",
      fontSize: "13px",
    }),
  };

  return (
    <div className="select-box">
      <label>{label}</label>
      <Select
        className={`option-select ${className}`}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isDisabled={disabled}
        isSearchable={true}
        placeholder="선택하세요..."
        styles={customStyles}
        components={{ IndicatorSeparator: () => null }}
      />
      {useInput ? (
        <input
          className="option-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={10}
          disabled={disabled}
        />
      ) : (
        <div className="option-input-placeholder"></div>
      )}
    </div>
  );
}
