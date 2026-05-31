import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import user from "./user.svg";
import stardesign from "./stardesign.svg";
import IntroContainer from "../../Atoms/introContainer/IntroContainer";
import like from "./like.svg";
import dislike from "./dislike.svg";
import good_review from "./good_review.svg";
import bad_review from "./bad_review.svg";
import { IoMdStar } from "react-icons/io";


import useGetReviewbyPropertyid from "../../hooks/useGetReviewbyPropertyid";
import ReviewCard from "../../components/reviewCard/ReviewCard";


import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import api from "../../service/apiGateway";
import ReviewCardSkeleton from "../../components/reviewCard/ReviewCardSkeleton"
import ReviewCardSlider from "../../components/reviewCardSlider/ReviewCardSlider";

const Section6 = ({ name, id,reviewAdded }) => {
  const { fetched, loading, error, data } = useGetReviewbyPropertyid(id);
  
  

  const box = document.querySelector("#reviewoverflowbox");
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
  console.log("section6");

  
    return (
      <div>
        <IntroContainer
          stardesign={stardesign}
          heading={`Reviews About ${name||"Property"}`}
          desc={`Find answers to common questions about Estateins's services, property
          listing, and the real estate process. We're here to provide clarity
          and assist you every tep of the way `}

          btntext="View All Reviews"
        />

        {/* <div
          className={styles.reviewcardcontainer}
          id="reviewoverflowbox"
          style={{
            position: "relative",
          }}

        > */}
          <ReviewCardSlider reviews={data} fetched={fetched} loading={loading} error={error}/>
          
        {/* </div> */}

      </div>
    );
  
   
  
};

export default Section6;
