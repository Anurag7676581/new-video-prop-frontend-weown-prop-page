import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Propertycard } from "../../components/propertyCard/Propertycard";

import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";
import PropertycardSkeleton from "../propertyCard/PropertycardSkeleton";

const Index = ({ projects }) => {
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
      <div
        style={{ right: "3rem" }}
        onClick={onClick}
        className={styles.circle}
      >
        <IoArrowBackSharp size="1.2rem" className={styles.arrow} />
      </div>
    );
  }

  const [visibleSlideCount, setVisibleSlideCount] = useState(0);
  const [totalSlideCount, setTotalSlideCount] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      const { slidesToShow } = sliderRef.current.innerSlider.props;
      setTotalSlideCount(sliderRef.current.innerSlider.props.children.length);
      setVisibleSlideCount(slidesToShow);
    }
  }, [window.innerWidth, projects]);

  const settings = {
    lazyLoad: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: projects ? Math.min(projects?.length, 3) : 3,
    slidesToScroll: projects ? Math.min(projects?.length, 3) : 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),

    responsive: [
      {
        breakpoint: 2200,
        settings: {
          slidesToShow: projects ? Math.min(projects?.length, 2) : 2,
          slidesToScroll: projects ? Math.min(projects?.length, 2) : 2,
        },
      },
      {
        breakpoint: 1799,
        settings: {
          slidesToShow: projects ? Math.min(projects?.length, 3) : 3,
          slidesToScroll: projects ? Math.min(projects?.length, 3) : 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: projects ? Math.min(projects?.length, 2) : 2,
          slidesToScroll: projects ? Math.min(projects?.length, 2) : 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: projects ? Math.min(projects?.length, 1) : 1,
          slidesToScroll: projects ? Math.min(projects?.length, 1) : 1,
        },
      },
    ],
  };
  const formatNumber = (number) => {
    // Convert the number to a string
    let numberStr = number.toString();

    // Check if the number is a single digit
    if (numberStr.length === 1) {
      // Add a leading zero
      numberStr = "0" + numberStr;
    }

    return numberStr;
  };
  const getSlideInfo = () => {
    if (visibleSlideCount > 0 && totalSlideCount > 0) {
      const currentPage = Math.ceil(activeSlide / visibleSlideCount) + 1;
      const totalPage = Math.ceil(totalSlideCount / visibleSlideCount);
      const a = formatNumber(currentPage);
      const b = formatNumber(totalPage);
      return `${a} of ${b}`;
    }
    return null;
  };

  return (
    <div>
      <div className={styles.sliderdivp} id="divtoslide">
        <Slider {...settings} ref={sliderRef}>
          {projects?.length > 0
            ? projects?.map((project, index) => (
                <Propertycard
                  key={project?.id}
                  {...project}
                  marginright="1rem"
                />
              ))
            : Array(4)
                .fill(0)
                .map((_, index) => {
                  return (
                    <PropertycardSkeleton key={index} marginright="1rem" />
                  );
                })}
        </Slider>
      </div>
      <div
        style={{
          marginTop: "1.5rem",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        {getSlideInfo() || ""}
      </div>
    </div>
  );
};

export default Index;
