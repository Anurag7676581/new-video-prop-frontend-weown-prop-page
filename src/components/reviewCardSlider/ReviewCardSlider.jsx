import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReviewCard from "../reviewCard/ReviewCard";

import { IoArrowBackSharp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";
import PropertycardSkeleton from "../propertyCard/PropertycardSkeleton";
import ReviewCardSkeleton from "../reviewCard/ReviewCardSkeleton";

const ReviewCardSlider = ({ reviews,fetched,loading,error }) => {
  console.log("reviews card slider->",reviews,"fetched->",fetched);
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
      console.log("slider red->",sliderRef)
      const { slidesToShow } = sliderRef.current.innerSlider.props;
      setTotalSlideCount(sliderRef.current.innerSlider.props.children.length);
      setVisibleSlideCount(slidesToShow);
    }
  }, [window.innerWidth, reviews]);

  const settings = {
    lazyLoad: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: reviews ? Math.min(reviews?.length, 3/2) : 3/2,
    slidesToScroll: reviews ? Math.min(reviews?.length, 1) : 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),

    responsive: [
    //   {
    //     breakpoint: 2200,
    //     settings: {
    //       slidesToShow: reviews ? Math.min(reviews?.length, 2) : 2,
    //       slidesToScroll: reviews ? Math.min(reviews?.length, 2) : 2,
    //     },
    //   },
    //   {
    //     breakpoint: 1799,
    //     settings: {
    //       slidesToShow: reviews ? Math.min(reviews?.length, 3) : 3,
    //       slidesToScroll: reviews ? Math.min(reviews?.length, 3) : 3,
    //     },
    //   },
    //   {
    //     breakpoint: 1280,
    //     settings: {
    //       slidesToShow: reviews ? Math.min(reviews?.length, 2) : 2,
    //       slidesToScroll: reviews ? Math.min(reviews?.length, 2) : 2,
    //     },
    //   },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: reviews ? Math.min(reviews?.length, 1) : 1,
          slidesToScroll: reviews ? Math.min(reviews?.length, 1) : 1,
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
            ? reviews?.map((review, index) => {
                console.log("review in slider", review)
              return  <ReviewCard
                  key={review._id}
                  review={review}
                  marginright="1rem"
                //   marginBottom="0.5rem"
                />
})
            : loading?Array(4)
                .fill(0)
                .map((_, index) => {
                  return <ReviewCardSkeleton key={index} marginright="1rem" />;
                }):null}
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

export default ReviewCardSlider;
