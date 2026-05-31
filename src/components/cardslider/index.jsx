import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider_arrow from "./slider_arrow.svg";

const Index = ({ children }) => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(1);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        // className={className}
        style={{
          ...style,
          // display: "block",

          border: "1px solid #E1E1E1",
          borderRadius: "50%",
          // padding: "0.8rem",
          position: "absolute",
          bottom: "-5.5rem",
          right: "0rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "2.5rem",
          height: "2.5rem",
        }}
        className={styles.rotate180}
        onClick={onClick}
        // onMouseDown={() => setBgColor("green")}
        // onMouseUp={() => setBgColor("")}
      >
        <img src={slider_arrow} alt="arrowImg" style={{ width: "40%" }} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        // className={className}
        style={{
          ...style,
          // display: "block",
          // background: "green",
          border: "1px solid #E1E1E1",
          borderRadius: "50%",
          // padding: "0.6rem",
          position: "absolute",
          bottom: "-5.5rem",
          right: "3rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#808080",
          // fontSize: "1.5rem",
          width: "2.5rem",
          height: "2.5rem",
        }}
        onClick={onClick}
      >
        <img src={slider_arrow} alt="arrowImg" style={{ width: "40%" }} />
        {/* &larr; */}
      </div>
    );
  }

  const [visibleSlideCount, setVisibleSlideCount] = useState(0);
  const [totalslideCount, setTotalSlideCount] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      const { slidesToShow } = sliderRef.current.innerSlider.props;
      setTotalSlideCount(sliderRef.current.innerSlider.props.children.length);
      setVisibleSlideCount(slidesToShow);
    }
  }, [window.innerWidth]);

  const settings = {
    lazyLoad: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),

    responsive: [
      {
        breakpoint: 1310,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className={styles.sliderdivp} id="divtoslide">
        <Slider {...settings} ref={sliderRef}>
          {children}
        </Slider>
      </div>
      <div
        // className={className}
        style={{
          marginTop: "1.5rem",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        {parseInt(activeSlide / visibleSlideCount) + 1} of{" "}
        {parseInt(totalslideCount / visibleSlideCount)}
      </div>
    </div>
  );
};

export default Index;
