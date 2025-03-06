import { InputProps } from "./types";

export function Input({
  type = "text",
  placeholder,
  value,
  onClick,
  onChange,
  readOnly = false,
  className,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
      readOnly={readOnly}
      className={`w-full pl-2 py-1 border-b border-gray-300 text-gray-700 focus:outline-none ${className}`}
    />
  );
}
