import { RadioGroupProps } from "./types";

export function RadioGroup({
  options,
  name,
  selectedValue,
  onChange,
  className,
}: RadioGroupProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />
          <span
            className={`w-4 h-4 border-2 border-gray-300 rounded-full flex items-center justify-center mr-2 ${
              selectedValue === option.value ? "border-orange-500" : ""
            }`}
          >
            {selectedValue === option.value && (
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            )}
          </span>
          <span
            className={
              selectedValue === option.value
                ? "text-orange-500 font-bold"
                : "text-gray-500"
            }
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
