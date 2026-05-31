import React from "react";
import styles from "./stylesmob.module.css";

import cross from "./cross.png";
import right from "./right.png";

const ThankyouModalmob = ({ onClose }) => {
  return (
    <div className={styles.thankmaindiv}>
      <div className={styles.thankyouseconddiv}>
        <div style={{ height: "30%", width: "35%" }}>
          <img
            src={right}
            alt="img"
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", color: "#7065f0" }}>Thank You!</h1>
          <p style={{ fontSize: "0.75rem", marginTop: "1rem" }}>
            We recieved your message. Someone
          </p>
          <p style={{ fontSize: "0.75rem", marginTop: "0rem" }}>
            from our team will contact you soon.
          </p>
        </div>
        <div>
          <button
            style={{
              backgroundColor: "#7065F0",

              border: "none",
              borderRadius: "9999px",
              height: "3rem",
              width: "50vw",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              fontSize: "1rem",
            }}
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankyouModalmob;
