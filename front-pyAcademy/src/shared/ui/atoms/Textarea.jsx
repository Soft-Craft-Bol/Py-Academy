import PropTypes from 'prop-types';

    /**
     * Textarea atómico reutilizable con estilos estandarizados.
     *
     * @param {object} props
     * @param {string} props.value       - Contenido del textarea.
     * @param {function} props.onChange  - Callback para actualizar el valor.
     * @param {string} [props.placeholder] - Texto de ayuda cuando está vacío.
     * @param {number} [props.rows=4]      - Número de filas visibles.
     * @param {string} [props.className]   - Clases Tailwind adicionales.
     */
export function Textarea({
    value,
    onChange,
    placeholder = '',
    rows = 4,
    className = '',
    ...props
}) {
return (
        <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`
            w-full
            px-4 py-3
            border border-gray-300 dark:border-zinc-600
            rounded-lg
            bg-white dark:bg-white text-gray-900 dark:text-gray-900
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${className}
            `}
        {...props}
        />
    );
}

Textarea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    className: PropTypes.string,
};
