import PropTypes from 'prop-types';
import './Input.css';

/**
 * Componente Input - Átomo básico para campos de entrada
 * 
 * @param {string} type - Tipo de input (text, email, password, etc.)
 * @param {string} placeholder - Texto de placeholder
 * @param {string} value - Valor controlado
 * @param {function} onChange - Manejador de cambio
 * @param {string} className - Clases CSS adicionales
 */
const Input = ({ type = 'text', placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-field ${className}`}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Input;