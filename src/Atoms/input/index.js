import React, { useState } from "react";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange = () => {},
  style,
}) => {
  const [inputValue, setInputValue] = useState(value);

  function changeHandler(event) {
    setInputValue(event.target.value);
    onChange(event.target.value);
  }

  const inputStyle = {
    ...style,
    width: "100%",
    height: "100%",
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={changeHandler}
      style={inputStyle}
    />
  );
};

export default Input;
