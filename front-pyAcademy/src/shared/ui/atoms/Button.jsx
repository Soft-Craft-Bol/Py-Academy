import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/**
 * Componente Button - Átomo básico para botones reutilizables
 *
 * @param {string} variant - Estilo del botón (primary, secondary, danger)
 * @param {string} size - Tamaño del botón (sm, md, lg)
 * @param {boolean} disabled - Estado deshabilitado
 * @param {function} onClick - Manejador de clic
 * @param {ReactNode} children - Contenido del botón
 * @param {string} className - Clases adicionales
 */
const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
  className = "",
  to,
  data = {},
}) => {
  const navigate = useNavigate();
  const baseClasses =
    "font-medium font-sans rounded-lg cursor-pointer transition-all duration-200 ease-in-out inline-flex items-center justify-center gap-2 border-0";

  const variantClasses = {
    primary: "bg-primary-pri1 text-white hover:bg-indigo-700",
    secondary:
      "bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledClasses =
    "opacity-60 cursor-not-allowed bg-gray-200 text-gray-500";

  const buttonClasses = `
    ${baseClasses}
    ${disabled ? disabledClasses : variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to, { state: { data } });
  };

  return (
    <button className={buttonClasses} disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
