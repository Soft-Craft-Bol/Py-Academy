const Select = ({
  className,
  name,
  id,
  onChange,
  options,
  placeholder,
  errors = null,
}) => {
  return (
    <div>
      <select
        id={id}
        className="p-2 rounded-lg  dark:bg-primary-pri4"
        name={name}
        onChange={onChange}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options &&
          options.map((optionElement, key) => {
            return (
              <option key={key} value={optionElement.value}>
                {optionElement.label}
              </option>
            );
          })}
      </select>
      {errors && errors[name] && (
        <span className="text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Select;
