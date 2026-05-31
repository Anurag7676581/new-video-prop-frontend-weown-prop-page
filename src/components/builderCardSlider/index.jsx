import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";

import { Builderscard } from "../builderscard/Builderscard";
import api from "../../service/apiGateway";
import BuildercardSkeleton from "../builderscard/BuildercardSkeleton";

const Index = ({ builders,loading,fetched,error }) => {
  const List1 = [
    { id: "1", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "2", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "3", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "4", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "5", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "6", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "7", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "8", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "9", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "10", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "11", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "12", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "13", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "14", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "15", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "16", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "17", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "18", heading: "Sara Johnson", subheading: "Delhi City Towner" },
    { id: "19", heading: "Sara Johnson", subheading: "Delhi City Towner" },
  ];
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        // className={className}
        // style={{
        //   ...style,
        // }}
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
        // className={className}
        // style={{
        //   ...style,
        // }}
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
  const [allbuilders, setAllBuilders] = useState([]);

  useEffect(() => {
    if (sliderRef.current) {
      const { slidesToShow } = sliderRef.current.innerSlider.props;
      setTotalSlideCount(sliderRef.current.innerSlider.props.children.length);
      setVisibleSlideCount(slidesToShow);
    }
  }, [window.innerWidth, builders]);

  const settings = {
    lazyLoad: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: builders ? Math.min(builders?.length, 4) : 4,
    slidesToScroll: builders ? Math.min(builders?.length, 4) : 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),

    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: builders ? Math.min(builders?.length, 3) : 3,
          slidesToScroll: builders ? Math.min(builders?.length, 3) : 3,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: builders ? Math.min(builders?.length, 2) : 2,
          slidesToScroll: builders ? Math.min(builders?.length, 2) : 2,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: builders ? Math.min(builders?.length, 1) : 1,
          slidesToScroll: builders ? Math.min(builders?.length, 1) : 1,
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
          {fetched
            ? builders?.map((builder, index) => (
                <Builderscard
                  key={builder.id}
                  {...builder}
                  marginright="1rem"

                  marginBottom="0.5rem"

                />
              ))
            : loading?Array(4)
                .fill(0)
                .map((_, index) => {
                  return <BuildercardSkeleton key={index} marginright="1rem" />;
                }):null}
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
        {getSlideInfo() || ""}
      </div>
    </div>
  );
};

export default Index;
