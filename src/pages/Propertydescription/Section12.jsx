
import React, { useState } from "react";


import styles from "./styles.module.css";
import EMI from "./EMI.svg";
import stardesign2 from "./stardesign2.svg";
import IntroContainer from "../../Atoms/introContainer/IntroContainer";
import Button from "../../Atoms/Button";

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import useAddReview from "../../hooks/useAddReview";
import api from "../../service/apiGateway";

const Section12 = ({ id,handleReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [submitted,setsubmitted]=useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading,setLoading]=useState(false);
  const [error,seterror]=useState(false);
  const userDetails = useSelector((store) => store.user);
  const [review, setReview] = useState({
    positiveFeedback: "",
    improvements: "",
  });

  const postData = async (data) => {
    try {
      setLoading(true);
      const response = await api.post(`/review`, data);
      console.log("response", response);
      setsubmitted(true);
      handleReviewAdded();
    } catch (error) {
      seterror(true);
      console.log("error while adding review", error);
    } finally{
      setLoading(false);
    }
  };
  const HandleSubmit = (e) => {

    e.preventDefault();
    if(loading||submitted) return;
    const data = {
      ...review,
      user_id: userDetails?.user_id,
      property_id: id,
      rating,
    };

   

    postData(data);
  };


  return (
    <div>
      <IntroContainer
        stardesign={stardesign2}
        heading="Testimonials"
        // desc={`Find answers to common questions about Estateins's services, property
        //   listing, and the real estate process. We're here to provide clarity
        //   and assist you every tep of the way `}
        // btntext="View Details"
      />

      <div
        style={{

          border: "1px solid #2F2D48",

          padding: "2rem",
          marginTop: "3rem",
          borderRadius: "10px",
        }}
      >
        <form className={styles.section12form}>
          <div className={styles.section12form_grid}>
            <div style={{ width: "100%", marginTop: "0rem" }}>

              <label
                htmlFor="positiveReview"
                style={{ fontWeight: "600", color: "#0F0B3E" }}
              >

                Good things here
              </label>
              <div
                className={styles.inputdiv}
                style={{ marginTop: "1rem", height: "8rem" }}
              >
                <textarea
                  id="positiveReview"
                  name="positiveReview"
                  type="text"

                  placeholder="Type here"
                  
                  value={review.positiveFeedback}
                  onChange={(e) =>
                    setReview((prevReview) => ({
                      ...prevReview,
                      positiveFeedback: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "#2F2D48",

                    resize: "none",
                    border: "none",
                    outline: "none",
                    // borderColor: "black",
                    // row: "50",
                  }}
                  required
                />
              </div>
            </div>
            <div style={{ width: "100%", marginTop: "0rem" }}>

              <label
                htmlFor="negativeReview"
                style={{ fontWeight: "600", color: "#0F0B3E" }}
              >

                Things need to improvement
              </label>
              <div
                className={styles.inputdiv}
                style={{ marginTop: "1rem", height: "8rem" }}
              >
                <textarea
                  id="negativeReview"
                  name="negativeReview"
                  type="text"

                  placeholder="Type here"
                 
                  value={review.improvements}
                  onChange={(e) =>
                    setReview((prevReview) => ({
                      ...prevReview,
                      improvements: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "#2F2D48",

                    resize: "none",
                    border: "none",
                    outline: "none",
                    // borderColor: "black",
                    // row: "50",
                  }}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div style={{ width: "100%", marginTop: "2rem" }}>

              <label
                htmlFor="rating"
                style={{ fontWeight: "600", color: "#0F0B3E" }}
              >
                Rating
              </label>
              <div id="rating" className={styles.section12stardivp}>
                {[1, 2, 3, 4, 5].map((num, index) => {
                  return (
                    <div
                      className={styles.section12stardiv}
                      onClick={() => {
                        if (rating === num) setRating(0);
                        else setRating(num);
                      }}
                      onMouseOver={() => {
                         setHoverRating(num);
                      
                      }}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      {hoverRating>0 && num<=hoverRating?<FaStar color="#55D6A7" size="25" />:hoverRating===0&&num <= rating ? (
                        <FaStar color="#55D6A7" size="25" />
                      ) : (
                        <CiStar color="#55D6A7" size="28" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }} onClick={HandleSubmit}>

            <Button type="primary2">{loading?"Submitting...":submitted?"Submitted":error?"Failed to Submit":"Submit"}</Button>
            

          </div>
        </form>
      </div>
    </div>
  );
};


export default Section12;

