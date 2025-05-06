import PropTypes from 'prop-types';
import './Button.css';

/**
 * Componente Button - Átomo básico para botones reutilizables
 * 
 * @param {string} variant - Estilo del botón (primary, secondary, danger)
 * @param {string} size - Tamaño del botón (sm, md, lg)
 * @param {boolean} disabled - Estado deshabilitado
 * @param {function} onClick - Manejador de clic
 * @param {ReactNode} children - Contenido del botón
 */
const Button = ({ variant = 'primary', size = 'md', disabled = false, onClick, children }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;