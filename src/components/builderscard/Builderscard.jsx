import React from "react";
import styles from "./styles.module.css";
import builderimage from "./builder.png";
import Button from "../../Atoms/Button";
import Chip from "../../Atoms/Chip";
import send from "./send.png";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const Builderscard = ({
  name,
  email,
  _id,
  heading,
  subheading,
  marginright,
  location,
  images,
  marginBottom,
}) => {
  return (
    <div
      className={styles.maindiv}
      style={{ marginRight: marginright, marginBottom: marginBottom }}
    >
      <div className={styles.imagediv}>
        {images?.length > 0 ? (
          <img
            src={images[0]}
            alt={"builder Image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
              backgroundColor: "#E1E1E1",
            }}
            className={styles.ogimg}
            // onLoad={handleImageLoaded}
          />
        ) : (
          <Skeleton
            width="100%"
            height="100%"
            borderRadius="10px"
            // baseColor="#202020"
            // highlightColor="#444"
            // duration={4}
          />
        )}
      </div>
      <div className={styles.description}>
        <div className={styles.heading}>{name}</div>
        <div className={styles.subheading} style={{ color: "#999999" }}>
          {location}
        </div>
      </div>

      {/* <div className={styles.details}>
        <div className={styles.capsule}>
          <div className={styles.visit}>Visit</div>
          <div className={styles.builderButton}>
            <Button
              style={{
                backgroundColor: "rgba(112, 101, 240, 1)",
                color: "white",
                // padding: ".5em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "60px",
                border: "0px solid",
                height: "2rem",
                width: "2rem",
              }}
            >
              <img src={send} className={styles.sendImg} />
            </Button>
          </div>
        </div>
      </div> */}

      <div className={styles.lastdiv}>
        <Link
          to="/contact_builders"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              fontWeight: "550",
              whiteSpace: "nowrap",
            }}
          >
            Contact Us
          </div>
        </Link>
        <Link to={`/builder/${_id}`} style={{ textDecoration: "none" }}>
          <div
            style={{
              backgroundColor: "#703BF7",
              padding: "0.5rem 1.5rem",
              borderRadius: "999px",
              color: "white",
            }}
          >
            View
          </div>
        </Link>
      </div>
    </div>
  );
};
