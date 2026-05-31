import React, { useState } from "react";
import styles from "./stylesmob.module.css";
import grid1 from "./grid1.png";
import arrow from "./arrow-left.png";
import ThankyouModal from "./ThankyouModalmob";

const Modal = ({ onClose, children }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const [description, setDescription] = useState("");
  const [thankyoumodal, setThankyoumodal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // setEmail("");
    // setFirstName("");
    // setLastName("");
    // setNumber("");
    // setDescription("");
    setThankyoumodal(true);
  };

  return (
    <div>
      <div style={{ position: "absolute", zIndex: "10" }}>
        {thankyoumodal && <ThankyouModal onClose={onClose} />}
      </div>

      <div className={styles.maindiv}>
        <div>
          <button
            style={{
              position: "absolute",
              left: "1rem",
              top: "2rem",

              // backgroundColor: "white",
              background: "none",

              border: "none",
              // display: "flex",
              // alignItems: "center",
              // gap: "0.2rem",
              // justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <img src={arrow} alt="img" />
          </button>
        </div>
        <div
          style={{
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "0rem",
              // marginLeft: "-2rem",
              height: "40%",
              width: "80%",
              // paddingLeft: "10%",
              // paddingTop: "8%",
              // backgroundColor: "black",
            }}
          >
            <img
              src={grid1}
              alt="img"
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className={styles.seconddiv}>
            <div style={{ padding: "0rem", width: "100%" }}>
              <div>
                <div>
                  <h2 style={{ color: "#7065f0" }}>Let's Connect</h2>
                  <div style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                    <p style={{ fontSize: "0.85rem" }}>
                      Let's get in touch. Fill the form below to send
                    </p>
                    <p style={{ fontSize: "0.85rem", marginTop: "0rem" }}>
                      us message. Our team will contact you soon.
                    </p>
                  </div>
                </div>
                <div>
                  <form onSubmit={handleSubmit}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        width: "100%",
                      }}
                    >
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="First Name"
                        className={styles.searchText2}
                        value={firstname}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />

                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Last Name"
                        className={styles.searchText2}
                        value={lastname}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="Email"
                        className={styles.searchText}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="digits"
                        id="number"
                        required
                        placeholder="Phone Number"
                        className={styles.searchText}
                        value={number}
                        onChange={(e) => {
                          setNumber(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Message"
                        className={styles.searchText1}
                        rows={4}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        textAlign: "center",

                        width: "100%",
                        height: "2rem",
                        backgroundColor: "#7065f0",

                        border: "none",
                        borderRadius: "0.5rem",
                        color: "white",
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
