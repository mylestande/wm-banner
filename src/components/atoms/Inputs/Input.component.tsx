"use client";

import { Check, Cross } from "../Icons/Icons";
import { useState } from "react";

const Input: React.FC<InputProps> = ({
  label = "",
  type = "text",
  error = false,
  name,
  validity,
  value = "",
  onChange = () => {},
  clearValue = () => {},
  disabled = false,
  errorText = "",
  placeholder,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex flex-col justify-start items-start gap-1 w-full">
      <label
        className={
          "font-normal capitalize text-grey-700 text-sm pl-2 dark:text-grey-100"
        }
        htmlFor={name}
      >
        {label}
      </label>
      <div
        className={[
          "relative flex items-center justify-between h-auto border border-grey-200 rounded w-full gap-2 px-2 duration-200 ease-in-out",
          error &&
            !validity &&
            value.length > 2 &&
            "!border-red-400 dark:!border-red-800",
          "dark:bg-grey-850 dark:border-grey-500",
          disabled &&
            "!border-grey-100 !bg-grey-100 !cursor-not-allowed dark:!bg-grey-700 dark:!border-grey-700",
          focus && "!border-primary-800 !shadow",
        ].join(" ")}
      >
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder ?? label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={[
            "text-base font-normal w-full text-grey-700 bg-transparent outline-none border-none py-2.5 min-h-11",
            "dark:text-grey-100 placeholder:dark:text-grey-300",
            disabled && "!cursor-not-allowed",
          ].join(" ")}
        />
        {validity && (
          <Check className={"fill-green-400 size-6 dark:fill-green-200"} />
        )}
        {!validity && value?.length > 1 && (
          <div onClick={() => clearValue(name)} className="cursor-pointer">
            <Cross className={"fill-red-400 size-6 dark:fill-red-800"} />
          </div>
        )}
      </div>
      {!validity && error && (
        <span className="dark:text-red-800">{errorText}</span>
      )}
    </div>
  );
};

export default Input;

export interface InputProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  clearValue: (name: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validity?: boolean;
  error?: boolean;
  disabled?: boolean;
  errorText?: string;
  placeholder?: string;
}
