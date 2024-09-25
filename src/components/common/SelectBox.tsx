interface Option {
  value: string;
  name: string;
}
interface SelectBoxProps {
  options: Option[];
  label: string;
  value: string;
  inputValue?: string;
  useInput?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function SelectBox({
  options,
  label,
  value,
  inputValue,
  onChange,
  handleInputChange,
  useInput = true,
}: SelectBoxProps) {
  return (
    <div className="d-flex">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((item: Option, index: number) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {useInput && (
        <input type="text" value={inputValue} onChange={handleInputChange} />
      )}
    </div>
  );
}
