import React, { useState } from "react";
import classNames from "classnames";
import styles from "./styles.module.css"; // Import the CSS file

const options = [
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
  { label: "New Launch", value: "New Launch" },
  { label: "Commercial", value: "Commercial" },
  { label: "Plot/Land", value: "Plot/Land" },
  { label: "Projects", value: "Projects" },
];

const OptionToogle = ({ onChange = () => {} }) => {
  const [active, setActive] = useState(options[0].label);

  function changeHandler(option) {
    setActive(option.label);
    onChange(option);
  }

  return (
    <div className={classNames(styles.flexRow)}>
      {options.map((option, index) => (
        <div
          key={index}
          style={{ height: "2.5rem" }}
          onClick={() => {
            changeHandler(option);
          }}
          className={classNames(styles.textdivp, {
            [styles.active]: active === option.label,
          })}
        >
          <span className={styles.text}>{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default OptionToogle;
