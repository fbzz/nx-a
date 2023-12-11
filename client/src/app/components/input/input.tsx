import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
}

export function Input({ label, value, onChange, ...props }: InputProps) {
  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          value={value}
          onChange={onChange}
          {...props}
          className="input input-bordered w-full"
        />
        <div className="label">
          <span className="label-text-alt"></span>
        </div>
      </label>
    </>
  );
}

export default Input;
