import { tv } from "tailwind-variants";
import { ButtonProps } from "./types";

const button = tv({
  base: "flex items-center justify-center font-medium rounded-full transition-all cursor-pointer",
  variants: {
    color: {
      primary: "text-white bg-orange-500 hover:bg-orange-600",
      gray: "text-black bg-gray-200 hover:bg-gray-300",
      white: "text-black bg-white-200",
    },
    variant: {
      filled: "",
      outline: "border border-orange-500 text-orange-500 hover:bg-orange-100",
      icon: "p-2 flex items-center justify-center border border-blue-500 bg-white hover:bg-gray-100",
    },
    size: {
      sm: "text-sm px-14 py-1.5",
      md: "text-md px-5 py-2",
      lg: "text-lg px-6 py-3",
    },
  },

  defaultVariants: {
    color: "primary",
    variant: "filled",
    size: "md",
  },
});

export function Button({
  type = "button",
  color,
  variant,
  size,
  disabled = false,
  children,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        button({ color, variant, size }) +
        ` ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`
      }
    >
      {children}
    </button>
  );
}
