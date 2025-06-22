import PropTypes from 'prop-types';

import { useState } from 'react';

import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


/**
 * Componente Input - Átomo reutilizable para campos de texto/contraseña
 *
 * @param {string} type - Tipo de input
 * @param {string} placeholder - Texto guía
 * @param {string} value - Valor actual del input
 * @param {function} onChange - Función al cambiar el valor
 * @param {string} name - Nombre del input
 * @param {boolean} showToggle - Mostrar ojito si es contraseña
 * @param {string} className - Clases personalizadas
 */
const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  showToggle = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type={showPassword && isPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-md text-label-md transition-border ease-in duration-200 bg-white focus:outline-none focus:border-blue-500 shadow-md"
      />
      {isPassword && showToggle && (
        <span
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
          onClick={handleToggleVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  showToggle: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
