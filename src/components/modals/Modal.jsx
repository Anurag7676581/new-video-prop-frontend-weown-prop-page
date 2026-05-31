import React from "react";
import styles from "./styles.module.css";

function Modal({ onClose, children }) {
  return (
    <>
      <div className={styles.modaloverlay} onClick={onClose}>
        <div className={styles["circle"]}></div>
        <div
          className={styles.modalcontent}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          {/* <button to="/signup" onClick={onClose}>Close</button> */}
        </div>
      </div>
    </>
  );
}

export default Modal;
