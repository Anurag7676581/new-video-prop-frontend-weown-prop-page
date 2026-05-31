import React from "react";
import styles from "./styles.module.css";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const index = ({ project, list, type }) => {
  if (!project)
    return (
      <Skeleton
        width="100%"
        height="100%"
        borderRadius="10px"
        // baseColor="#202020"
        // highlightColor="#444"
        // duration={4}
      />
    );
  const { images, name, location } = project;

  // const list = [
  //   {
  //     id: 1,

  //     bgopacitycolor:
  //       "linear-gradient(to bottom, rgba(119, 123, 4, 0), rgba(119, 123, 4, 1))",
  //   },
  //   {
  //     id: 2,

  //     bgopacitycolor:
  //       "linear-gradient(to bottom, rgba(81, 144, 157, 0), rgba(81, 144, 157, 1))",
  //   },
  //   {
  //     id: 3,

  //     bgopacitycolor:
  //       "linear-gradient(to bottom, rgba(78, 99, 55, 0), rgba(78, 99, 55, 1))",
  //   },
  //   {
  //     id: 4,

  //     bgopacitycolor:
  //       "linear-gradient(to bottom, rgba(119, 123, 4, 0), rgba(119, 123, 4, 1))",
  //   },
  //   {
  //     id: 5,

  //     bgopacitycolor:
  //       "linear-gradient(to bottom, rgba(119, 123, 4, 0), rgba(119, 123, 4, 1))",
  //   },
  //   {
  //     id: 6,

  //     bgopacitycolor:
  //       "linear-gradient(to bottom, rgba(119, 123, 4, 0), rgba(119, 123, 4, 1))",
  //   },
  // ];

  return (
    <>
      <Link to={`/property_description/${project?._id}`}>
        <div
          className={styles.maindiv}
          // style={{ width: `${type === "big" ? "13rem" : "10rem"}` }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <img
              src={images[0]}
              alt="Project image"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </div>

          <div className={styles.titledivp}>
            <h4
              style={{
                color: "white",
                fontSize: `${type === "big" ? "1.3rem" : "1.1rem"}`,
                fontWeight: "normal",
              }}
            >
              {name}
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontWeight: "bold",
              }}
            >
              <span
                style={{ fontSize: `${type === "big" ? "1rem" : "0.8rem"}` }}
              >
                {"Delhi"}
              </span>
              <span>{4}</span>
            </div>
          </div>

          <div
            className={styles.bgopacitycolor}
            style={{ background: `${list?.bgopacitycolor}` }}
          ></div>
        </div>
      </Link>
    </>
  );
};

export default index;
