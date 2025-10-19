import React from "react";

export interface TextInputProps {
  label: string;
  value: string | number;
  inputClassName: string;
  onChange: (value: string) => void;
  type?: "text" | "password" | "email";
  placeholder?: string;
  error?: string;
  required?: boolean;
  name?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  inputClassName,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  name,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm text-gray-900 tracking-tight text-shadow-xs"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 ${inputClassName}`}
      />
    </div>
  );
};
