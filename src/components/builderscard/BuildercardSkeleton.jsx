import React from "react";
import styles from "./styles.module.css";
import builderimage from "./builder.png";
import Button from "../../Atoms/Button";
import Chip from "../../Atoms/Chip";
import send from "./send.png";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const BuildercardSkeleton = ({ marginright }) => {
  return (
    <div className={styles.maindiv} style={{ marginRight: marginright }}>
      <div className={styles.imagediv}>
        <Skeleton
          width="100%"
          height="100%"
          borderRadius="10px"
          // baseColor="black"
          // highlightColor="#444"
          // duration={4}
        />
      </div>
      <div className={styles.description}>
        <div className={styles.heading} style={{ width: "60%" }}>
          <Skeleton
            width="100%"
            height="100%"
            borderRadius="10px"
            count={1}
            // baseColor="#202020"
            // highlightColor="#444"
            // duration={4}
          />
        </div>
        <div
          className={styles.subheading}
          style={{ color: "#999999", width: "40%", marginTop: "0.5rem" }}
        >
          <Skeleton
            width="100%"
            height="100%"
            borderRadius="10px"
            count={1}
            // baseColor="#202020"
            // highlightColor="#444"
            // duration={4}
          />
        </div>
      </div>

      <div className={styles.lastdiv}>
        <div
          style={{
            fontSize: "0.9rem",
            fontWeight: "550",
            whiteSpace: "nowrap",
            width: "30%",
            marginLeft: "1rem",
          }}
        >
          <Skeleton
            width="100%"
            height="100%"
            borderRadius="10px"
            count={1}
            // baseColor="#202020"
            // highlightColor="#444"
            // duration={4}
          />
        </div>

        <div
          style={{
            // backgroundColor: "#703BF7",
            padding: "0.5rem 1.5rem",
            borderRadius: "999px",
            color: "white",
            width: "40%",
            height: "3.5rem",
          }}
        >
          <Skeleton
            width="100%"
            height="100%"
            borderRadius="999px"
            count={1}
            // baseColor="#202020"
            // highlightColor="#444"
            // duration={4}
          />
        </div>
      </div>
    </div>
  );
};
export default BuildercardSkeleton;
