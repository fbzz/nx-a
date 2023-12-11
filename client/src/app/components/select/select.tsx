import { SelectHTMLAttributes } from "react";

/* eslint-disable-next-line */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
}

export interface SelectOption {
  text: string;
  value: string | number;
}

export function Select({ label, value, options = [], ...props }: SelectProps) {
  return (
    <label className="form-control w-full ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className="select w-full select-bordered"
        value={value}
        {...props}
      >
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default Select;
