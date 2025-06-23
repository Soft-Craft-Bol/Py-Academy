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
 * @param {string} className - Clases personalizadas para el input
 */
const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  name = '',
  showToggle = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleToggleVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="relative w-full">
      <input
        type={isPassword && showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className={`w-full py-3 px-4 pr-10 border border-gray-300 rounded-md text-base transition ease-in duration-200 bg-white dark:bg-white text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md ${className}`}
        {...props}
      />
      {isPassword && showToggle && (
        <button
          type="button"
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={handleToggleVisibility}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
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
