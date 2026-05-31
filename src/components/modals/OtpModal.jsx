import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/userSlice";

function OtpModal({ onClose, onSubmit, userData, apiEndpoint, phone }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [focusIndex, setFocusIndex] = useState(0);
  const otpInputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      setFocusIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to the previous input box on backspace
    if (e.key === "Backspace" && index > 0) {
      setFocusIndex(index - 1);
    }
  };

  useEffect(() => {
    // Set focus to the current input box
    if (otpInputRefs[focusIndex] && otpInputRefs[focusIndex].current) {
      otpInputRefs[focusIndex].current.focus();
    }
  }, [focusIndex]);

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    console.log(enteredOtp);
    // Combine user data with entered OTP
    const dataToSend = { ...userData, otp: enteredOtp };

    try {
      // Make the API call using axios
      const response = await axios.post(apiEndpoint, dataToSend);

      // Handle the API response as needed
      console.log("API Response:", response.data);
      const data = response?.data;

      if (data?.data?.success === true) {
        dispatch(setLoggedIn(data?.data));
        onClose();
        alert(data?.data?.message);
        navigate("/home");
      } else {
        alert(data?.data?.msg);
      }

      // Close the modal
    } catch (error) {
      // Handle API error
      console.error("API Error:", error.message);
      // Display an error message or take appropriate action
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.heading}>OTP Verification</h2>

      <p className={styles.description}>
        We’ve sent an OTP via SMS code check your messages{" "}
        <span className={styles.heading}>{phone}</span> and fill it in.{" "}
      </p>
      <div className={styles["box"]}>
        {otp.map((value, index) => (
          <input
            className={styles["input-box"]}
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={otpInputRefs[index]}
          />
        ))}
      </div>
      <button className={styles["submit-button"]} onClick={handleSubmit}>
        Submit
      </button>
      <p className={styles["description"]}>
        Don't receive code? <a className={styles.link}>Resend</a>
      </p>
      <button className={styles["change-number"]} onClick={handleSubmit}>
        Change Phone
      </button>
    </Modal>
  );
}

export default OtpModal;
