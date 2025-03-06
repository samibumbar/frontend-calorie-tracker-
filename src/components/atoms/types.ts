export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  color?: "primary" | "gray" | "white";
  variant?: "filled" | "outline" | "icon";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean; //
};
export type InputProps = {
  type?: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
  onClick?: () => void;
};

export type RadioGroupProps = {
  options: { label: string; value: string }[];
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
};
