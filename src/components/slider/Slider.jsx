import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";

const Index = ({ children }) => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ right: "0rem" }}
        onClick={onClick}
        className={styles.circle}
      >
        <IoArrowForwardSharp size="1.2rem" className={styles.arrow} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div style={{ left: "0rem" }} onClick={onClick} className={styles.circle}>
        <IoArrowBackSharp size="1.2rem" className={styles.arrow} />
      </div>
    );
  }

  const settings = {
    lazyLoad: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <div className={styles.sliderdivp} id="divtoslide">
        <Slider {...settings}>{children}</Slider>
      </div>
    </div>
  );
};

export default Index;
