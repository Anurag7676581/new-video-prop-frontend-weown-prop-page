import React from "react";
import styles from "./styles.module.css";

const Button = ({
  onClick = () => {},
  type = "",
  children,
  style,
  isDisabled = false,
}) => {
  return (
    <button onClick={onClick} style={style} className={`${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
