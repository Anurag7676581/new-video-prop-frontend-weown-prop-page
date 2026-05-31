import React from "react";
import Icon from "../Icon";
import styles from "./styles.module.css";
import classNames from "classnames";

const Chip = ({ label = "Bathroom", icon = "" }) => {
  return (
    <div className={classNames(styles.flexRow)}>
      <Icon name={icon} />
      <span className={classNames(styles.text)}>{label}</span>
    </div>
  );
};

export default Chip;
