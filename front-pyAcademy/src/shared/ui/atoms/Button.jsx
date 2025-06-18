import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { cn } from "@/shared/utils/classnames";

const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
  className = "",
  to,
  data = {},
  iconLeft,
  iconRight,
}) => {
  const navigate = useNavigate();

  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 ease-in-out inline-flex items-center justify-center gap-2";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const disabledClasses = "opacity-60 cursor-not-allowed bg-gray-200 text-gray-500";

  const buttonClasses = cn(
    baseClasses,
    disabled ? disabledClasses : variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {iconLeft && <span>{iconLeft}</span>}
      {children}
      {iconRight && <span>{iconRight}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link
        to={to}
        state={data}
        className={buttonClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
  data: PropTypes.object,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
};

export default Button;
