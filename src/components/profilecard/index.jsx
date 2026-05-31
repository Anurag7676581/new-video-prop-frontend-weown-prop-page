import React, { useEffect, useState } from "react";
import Profilebox from "../../Atoms/profilebox";
import styles from "./styles.module.css";
import upright from "./upright.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { isLoggedIn } from "./../../auth/index";

const Index = () => {
  // const [totalPropertiesViewed, setTotalPropertiesViewed] = useState(0);
  const userDetails = useSelector((store) => store.user);
  const getPropertiesViewed = () => {
    return userDetails?.propertiesViewed?.length;
  };


  return (
    <div className={styles.profileContainerdiv}>
      <Profilebox />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontSize: "0.8rem",
            color: "#3F3D5663",
            fontWeight: "650",
          }}
        >
          Your recent activity
        </p>

        <div
          style={{
            backgroundColor: "#CDC9FA",
            paddingInline: "1rem",
            paddingBlock: "0.5rem",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            color: "black",
            width: "60%",
            textAlign: "left",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0rem",
              right: "0.5rem",
            }}
          >
            <img src={upright} alt="img" />
          </div>
          <p
            style={{
              fontWeight: "bolder",
              fontSize: "1.2rem",
              // lineHeight: "1.5",
            }}
          >

            {getPropertiesViewed() || 0}

          </p>{" "}
          <p style={{ fontSize: "0.75rem", fontWeight: "600" }}> viewed</p>
        </div>

      
      </div>
      <Link

          to={userDetails?.isLoggedIn ? "/activity" : "/login"}
          style={{ textDecoration: "none" }}
        >

          <div
            style={{
              backgroundColor: "#7065f0",
              paddingBlock: "0.5rem",
              paddingInline: "auto",
              borderRadius: "999px",
              textAlign: "center",

              fontSize: "0.8rem",

              fontWeight: "400",
              color: "white",
            }}
          >
            {userDetails?.isLoggedIn ? "View all activity" : "Login/Register"}

          </div>
        </Link>
    </div>
  );
};

export default Index;
