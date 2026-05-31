import React from "react";
import styles from "./styles.module.css";
import bedroom_logo from "./bedroom_logo.png";

import bathroom_logo from "./bathroom_logo.png";
import villa_logo from "./Villa_logo.png";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PropertycardSkeleton = ({ marginright,marginBottom }) => {
  return (
    <div className={styles.maindiv}  style={{ marginRight: marginright, marginBottom: marginBottom }}>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
            width: "100%",
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
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
            width: "100%",
          }}
        >
          <div className={styles.subheading}>
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
      </div>

      <div className={styles.details}>
        <div className={styles.capsule}>
          <div>
            <Skeleton
              width="3rem"
              height="1rem"
              borderRadius="10px"
              count={1}
              // baseColor="#202020"
              // highlightColor="#444"
              // duration={4}
            />
          </div>
          <span style={{ whiteSpace: "nowrap" }}>
            <Skeleton
              width="100%"
              height="100%"
              borderRadius="10px"
              count={1}
              // baseColor="#202020"
              // highlightColor="#444"
              // duration={4}
            />
          </span>
        </div>
        <div className={styles.capsule}>
          <div>
            <Skeleton
              width="3rem"
              height="1rem"
              borderRadius="10px"
              count={1}
              // baseColor="#202020"
              // highlightColor="#444"
              // duration={4}
            />
          </div>
          <span style={{ whiteSpace: "nowrap" }}>
            <Skeleton
              width="100%"
              height="100%"
              borderRadius="10px"
              count={1}
              // baseColor="#202020"
              // highlightColor="#444"
              // duration={4}
            />
          </span>
        </div>
        <div className={styles.capsule}>
          <div>
            <Skeleton
              width="3rem"
              height="1rem"
              borderRadius="10px"
              count={1}
              // baseColor="#202020"
              // highlightColor="#444"
              // duration={4}
            />
          </div>
          <span style={{ whiteSpace: "nowrap" }}>
            <Skeleton
              width="100%"
              height="100%"
              borderRadius="10px"
              count={1}
              // baseColor="#202020"
              // highlightColor="#444"
              // duration={4}
            />
          </span>
        </div>

      </div>

      <div className={styles.pricediv} style={{ width: "100%" }}>
        <div className={styles.pricesection} style={{ width: "30%" }}>
          <div style={{ fontSize: "0.8rem", width: "50%" }}>
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
            style={{ fontWeight: "bold", fontSize: "1.1rem", width: "100%" }}
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

        <div
          className={styles.propertyButton}
          style={{ width: "50%", marginTop: "0rem" }}
        >
          <div>
            <Skeleton
              width="100%"
              height="3rem"
              borderRadius="10px"
              count={1}
              // baseColor="#202020"
              // highlightColor="#444"
              // duration={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertycardSkeleton;
