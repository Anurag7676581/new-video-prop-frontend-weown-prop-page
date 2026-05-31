import React from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import { Link } from "react-router-dom";

const IntroContainer = ({
  stardesign,
  heading,
  btntext,
  desc,
  descStyle,
  path,
}) => {
  return (
    <div>
      <div style={{ width: "3rem", marginLeft: "-1rem" }}>
        <img
          src={stardesign}
          alt="img"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <h4 style={{ fontSize: "2rem", fontWeight: "650", whiteSpace: "wrap" }}>
        {heading}
      </h4>

      {
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginTop: "0.5rem",
          }}
        >
          <p style={{ ...descStyle, color: "#525252" }} className={styles.desc}>
            {desc}
            {/* Find answers to common questions about Estateins's services, property
          listing, and the real estate process. We're here to provide clarity
          and assist you every tep of the way */}
          </p>
          {btntext && (
            <Link to={path}>
              <Button type="grey">{btntext}</Button>{" "}
            </Link>
          )}
        </div>
      }
    </div>
  );
};

export default IntroContainer;
