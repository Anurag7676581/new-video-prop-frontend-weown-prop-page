import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

const TAB_OPTIONS = [
  { label: "Overview", target: "top" },
  { label: "Highlights", target: "sec-highlights" },
  { label: "More About Project", target: "sec-about" },
  { label: "Floor Plan", target: "sec-gallery" },
  { label: "Pricing Details", target: "section3" },
  { label: "Map View", target: "section4" },
  { label: "Contact Builder", target: "section5" },
  { label: "Reviews", target: "section6" },
];

const Section1 = ({ handlesectionScroll, activeTab }) => {
  function changeHandler(option) {
    handlesectionScroll(option.target, option.label);
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
