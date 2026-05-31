import React from "react";
import styles from "./styles.module.css";

import cross from "./cross.png";
import thankyou from "./thankyou.png";

const ThankyouModal = ({ onClose }) => {
  return (
    <div className={styles.maindiv}>
      <div className={styles.thankyouseconddiv}>
        <div>
          <button
            style={{
              position: "absolute",
              right: "1rem",
              top: "1rem",

              backgroundColor: "white",

              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <img src={cross} alt="img" />
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "3rem", color: "#7065f0" }}>Thank You!</h1>
          <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
            We recieved your message. Someone from our team
          </p>
          <p style={{ fontSize: "0.9rem", marginTop: "0rem" }}>
            will contact you soon.
          </p>
        </div>
        <div style={{ height: "80%", width: "70%", marginTop: "2rem" }}>
          <img
            src={thankyou}
            alt="img"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ThankyouModal;
