import React, { useState } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/filterslice";

const Index = () => {
  const dispatch = useDispatch();
  const rangeSlider = useSelector((store) => store.filters.priceRange);
  const st = 0;
  const end = 60000000;
  const minRange = rangeSlider[0];
  const maxRange = rangeSlider[1];
  const leftposition = `${(minRange / end) * 100}%`;
  const rightposition = `${100 - (maxRange / end) * 100}%`;
  // const [minRange, setMinRange] = useState(minvalue);
  // const [maxRange, setMaxRange] = useState(maxvalue);

  const handleMinRange = (e) => {
    const value = parseInt(e.target.value);
    if (maxRange - value >= 10 && value >= st) {
      dispatch(setFilters({ type: "priceRange", value: [value, maxRange] }));
      // setMinRange(value);
    }
  };
  const handleMaxRange = (e) => {
    const value = parseInt(e.target.value);
    if (value - minRange >= 10 && value <= end) {
      dispatch(setFilters({ type: "priceRange", value: [minRange, value] }));
      // setMaxRange(value);
    }
  };

  return (
    <div className={styles.maindiv}>
      <div className={styles.slider}>
        <div
          className={styles.progress}
          style={{
            left: leftposition,
            right: rightposition,
          }}
        ></div>

        <div
          className={styles.rectangle1}
          style={{
            left: leftposition,
          }}
        >
          {minRange}
        </div>
        <div
          className={styles.rectangle2}
          style={{
            right: rightposition,
          }}
        >
          {maxRange}
        </div>

        <input
          type="range"
          min={st}
          max={end}
          value={minRange}
          onChange={(e) => handleMinRange(e)}
          className={styles.minrange}
        />
        <input
          type="range"
          min={st}
          max={end}
          value={maxRange}
          onChange={(e) => handleMaxRange(e)}
          className={styles.maxrange}
        />
      </div>

      <div className={styles.rangeinput}></div>

      <div className={styles.inputp}>
        <input
          type="number"
          placeholder="Min Budget"
          className={styles.input}
          value={minRange === rangeSlider[0] ? "Min Budget" : minRange}
          onChange={(e) => handleMinRange(e)}
        />
        <input
          type="number"
          placeholder="Max Budget"
          className={styles.input}
          value={maxRange === rangeSlider[1] ? "Max Budget" : maxRange}
          onChange={(e) => handleMaxRange(e)}
        />
      </div>
    </div>
  );
};

export default Index;
