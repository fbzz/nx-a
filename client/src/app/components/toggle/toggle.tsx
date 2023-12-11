import { InputHTMLAttributes } from "react";

/* eslint-disable-next-line */
export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label: string;
}

//Removing type from the props
export function Toggle({ label, checked, ...props }: ToggleProps) {
  return (
    <div className="flex flex-col py-5">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          readOnly
          checked={checked}
          className="toggle toggle-secondary"
          {...props}
        />
      </label>
    </div>
  );
}

export default Toggle;
