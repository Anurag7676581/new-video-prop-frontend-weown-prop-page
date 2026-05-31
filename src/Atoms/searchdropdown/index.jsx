import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";

import { setFilters } from "../../redux/filterslice";

const Index = ({ dropdownname, logo, style, list }) => {
  const dispatch = useDispatch();
  const handleAppliedfilter = (name) => {

    dispatch(setFilters({ type: "city", value: name }));

  };
  const { bgcolor, border, droplogobg, namecolor, flexgap, selectBoxwidth } =
    style;
  const [isopen, setIsopen] = useState(-1);
  const dropdownRef1 = useRef(null);

  const city = useSelector((store) => store.filters.city);
  const handleIsopen = (id) => {
    if (isopen === id) setIsopen(-1);
    else setIsopen(id);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) {
      setIsopen(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlevar = (name) => {
    handleAppliedfilter(name);

    setIsopen(-1);
  };
  return (
    <div
      className={styles.selectBox}
      ref={dropdownRef1}
      onClick={() => handleIsopen(0)}
      style={{
        backgroundColor: bgcolor,
        border: border,
        "--flexgap": flexgap,
        "--selectBoxwidth": selectBoxwidth,
      }}
    >
      <span
        style={{
          fontSize: "1rem",
          width: "5rem",
          whiteSpace: "nowrap",
          fontWeight: "600",
          overflow: "hidden",
          // backgroundColor: "yellow",
          color: namecolor,
        }}
      >
        {city || "Banglore"}
      </span>
      <div
        style={{
          backgroundColor: droplogobg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "1.5rem",
          height: "1.5rem",
          padding: "0.2rem",
          borderRadius: "50%",
        }}
      >
        {logo && (
          <div className={styles.droplogo}>
            <img
              src={logo}
              alt="img"
              style={{ width: "100%", height: "100%" }}
              className={isopen === 0 && styles.rotate180}
            />
          </div>
        )}{" "}
      </div>

      {isopen !== -1 && (
        <div className={styles.optionBox}>
          <ul>
            {list?.map((name, index) => {
              return (
                <li
                  onClick={() => handlevar(name)}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Index;
