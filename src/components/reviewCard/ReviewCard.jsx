import React from "react";
import styles from "./styles.module.css";
import like from "./like.svg";
import dislike from "./dislike.svg";
import good_review from "./good_review.svg";
import bad_review from "./bad_review.svg";
import { IoMdStar } from "react-icons/io";
import Skeleton from "react-loading-skeleton";

const ReviewCard = ({ review,marginright }) => {
  console.log("review->",review)
  return (
    <div >
      <div className={styles.reviewcard} style={{marginRight:marginright}}>
        <div className={styles.reviewcardsection1}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                paddingTop: "2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
               
                <div
                  style={{
                    borderRadius: "999px",
                    height: "3rem",
                    width: "3rem",
                  }}
                >
                  {review?.img ?
                  <img
                    src={review?.img}
                    alt="userimg"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "999px",
                      objectFit: "cover",
                    }}
                  />:<Skeleton circle={true} width="100%" height="100%"/>}
                </div>
              

              <div>
                <p style={{ fontWeight: "550", whiteSpace: "nowrap" }}>
                  {review?.name ||<Skeleton count={1}/>}
                </p>
                <p
                  style={{
                    color: "grey",
                    fontSize: "0.8rem",
                    marginTop: "0.3rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {review?.createdat && `Broker | ${review?.createdat}`||<Skeleton width="5rem"/>}
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                // alignItems: "center",
                justifyContent: "center",
                gap: "0.2rem",
                border: "1px solid #55D6A7",
                background: "#55D6A71A",
                borderRadius: "8px",
                padding: "0.2rem 0.8rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#55D6A7",
                }}
              >
                {review?.rating||0}
              </span>
              <div>
                <IoMdStar color={"#55D6A7"} size={13} />
              </div>
            </div>
          </div>
          <div className={styles.reviewgriddiv}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.8rem",

                // paddingRight: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "0.8rem",
                    height: "0.8rem",
                    marginTop: "-0.2rem",
                  }}
                >
                  <img src={good_review} alt="img" style={{ width: "100%" }} />
                </div>
                <div style={{ fontWeight: "600", whiteSpace: "nowrap" }}>
                  Good things here
                </div>
              </div>
              <p style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                {review?.positiveFeedback||null}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.8rem",
                borderLeft: "2px solid #E1E1E1",
                paddingLeft: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "0.8rem",
                    height: "0.8rem",
                    marginTop: "-0.2rem",
                  }}
                >
                  <img src={bad_review} alt="img" style={{ width: "100%" }} />
                </div>
                <div style={{ fontWeight: "600", whiteSpace: "nowrap" }}>
                  Things need to improvement
                </div>
              </div>
              <p style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                {review?.improvements||null}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.reviewcardsection2}>
          <div
            style={{
              fontSize: "0.9rem",
              color: "#999999",
              fontWeight: "600",
            }}
          >
            Is this helpful?
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <div className={styles.section6likeimgdiv}>
              <img src={like} alt="like" style={{ width: "30%" }} />
            </div>
            <div className={styles.section6likeimgdiv}>
              <img src={dislike} alt="dislike" style={{ width: "30%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
