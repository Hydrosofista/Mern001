import "./Select.css";

const Select = ({ values, onValueChange, selectedValue, ...rest }) => {
  console.log("Selected value:", selectedValue);
  console.log("Values:", values);
  return (
    <select value={selectedValue} onChange={onValueChange} {...rest}>
      {values.map(({ value, text }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;
