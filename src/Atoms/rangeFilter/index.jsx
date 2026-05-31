import React, { useState } from "react";
import ReactSlider from "react-slider";
import styles from "./styles.module.css";

const Index = () => {
  const MIN = 567567567568768;
  const MAX = 10076767867;
  const [minbudget, setMinbudget] = useState(null);
  const [maxbudget, setMaxbudget] = useState(null);

  const [values, setValues] = useState([MIN, MAX]);

  const handleSliderChange = (newValues) => {
    setValues(newValues);
  };

  const handleinput = (e, index) => {
    // const newValue = Math.max(0, Math.min(100, Number(e.target.value)));
    const newValue = e.target.value;
    const newValues = [...values];

    newValues[index] = newValue;

    setValues(newValues);
  };

  return (
    <div>
      <ReactSlider
        className={styles.slider}
        thumbClassName={styles.thumb}
        defaultValue={[0, 10787680]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        onChange={handleSliderChange}
        renderTrack={(props, state) => {
          const trackClass = `${styles.track} ${
            state.index === 1 ? styles.activetrack : ""
          }`;
          return <div {...props} className={trackClass} />;
        }}
        renderThumb={(props, state) => (
          <div {...props} className={styles.thumb}>
            <div className={styles.thumbValue}>{values[state.index]}</div>
          </div>
        )}
        pearling
        minDistance={0}
      />

      <div className={styles.inputp}>
        <input
          type="number"
          placeholder="Min Budget"
          className={styles.input}
          value={minbudget}
          onChange={(e) => handleinput(e, 0)}
        />
        <input
          type="number"
          placeholder="Max Budget"
          className={styles.input}
          value={maxbudget}
          onChange={(e) => handleinput(e, 1)}
        />
      </div>
    </div>
  );
};

export default Index;
