import React from "react";
import styles from "./styles.module.css";
import searchlogo from "./searchlogo.svg";
import Searchdropdown from "../../Atoms/searchdropdown";
import whitedroplogo from "./whitedroplogo.svg";

const index = () => {
  const location = ["Banglore", "Delhi", "Ahemdabad"];
  const togglelist = [
    "Buy",
    "Rent",
    "New Launch",
    "Commercial",
    "Plot/Land",
    "Projects",
  ];
  const style = {
    border: "",
    bgcolor: "white",
    droplogobg: "#7065f0",
    namecolor: "#7065f0",
    flexgap: "2rem",
    selectBoxwidth: "100%",
  };
  return (
    <div className={styles.maindiv}>
      <div className={styles.searchdivp}>
        <div className={styles.inputdivp}>
          <input placeholder="Search For a Property" />
        </div>
        <div className={styles.purplebuttondiv}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              whiteSpace: "noWrap",
            }}
          >
            <img src={searchlogo} alt="img" style={{ width: "1rem" }} />
          </button>
        </div>
      </div>
      <div className={styles.searchdropdivp}>
        <Searchdropdown
          dropdownname={"Buy"}
          logo={whitedroplogo}
          style={style}
          list={togglelist}
        />
        <Searchdropdown
          dropdownname={"Banglore"}
          logo={whitedroplogo}
          style={style}
          list={location}
        />
      </div>
    </div>
  );
};

export default index;
