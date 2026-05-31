import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

const TAB_OPTIONS = [
  { label: "Overview", sectionId: 1 },
  { label: "Highlights", sectionId: 2 },
  { label: "More About Project", sectionId: 2 },
  { label: "Floor Plan", sectionId: 2 },
  { label: "Pricing Details", sectionId: 3 },
  { label: "Map View", sectionId: 4 },
  { label: "Contact Builder", sectionId: 5 },
  { label: "Reviews", sectionId: 6 },
];

const Section1 = ({ handlesectionScroll, activeTab }) => {
  function changeHandler(option) {
    handlesectionScroll(option.sectionId, option.label);
  }
  const box = document.querySelector("#overflowbox");
  const scrollprev = () => {
    const width = box.clientWidth;
    box.scrollTo({
      left: box.scrollLeft - width,
      behavior: "smooth",
    });
  };
  const scrollnext = () => {
    const width = box.clientWidth;
    box.scrollTo({
      left: box.scrollLeft + width,
      behavior: "smooth",
    });
  };

  return (

    <div className={styles.section1maindiv} >
      {/* <div onClick={scrollprev} className={styles.leftarr}>

        <MdArrowBackIosNew size={12} />
      </div>
      <div onClick={scrollnext} className={styles.rightarr}>
        <MdArrowForwardIos size={12} />

      </div> */}
     

      <div className={classNames(styles.toggleContainer)} id="overflowbox">
        {TAB_OPTIONS.map((option) => (
          <div
            key={option.label}
            style={{
              borderBottom:
                activeTab === option.label ? "3px solid #7065f0" : null,
              color: activeTab === option.label ? "#7065f0" : null,
              height: "2.8rem",
            }}
            onClick={() => changeHandler(option)}
            className={styles.option}
          >
            {option.label}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Section1;
