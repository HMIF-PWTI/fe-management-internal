import { ButtonProps } from "./types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-gold hover:bg-gold-dark text-dark-primary focus:ring-gold",
    secondary:
      "bg-dark-secondary hover:bg-dark-tertiary text-text-primary focus:ring-dark-tertiary",
    outline:
      "border border-gold text-gold hover:bg-gold hover:text-white focus:ring-gold",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <AiOutlineLoading3Quarters className="animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
};

export default Button;
