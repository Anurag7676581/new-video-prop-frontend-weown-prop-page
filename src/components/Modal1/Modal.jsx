import React, { useState } from "react";
import styles from "./styles.module.css";
import grid1 from "./grid1.png";
import cross from "./cross.png";
import ThankyouModal from "./ThankyouModal";

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

  return thankyoumodal ? (
    <ThankyouModal onClose={onClose} />
  ) : (
    <div className={styles.maindiv}>
      <div className={styles.seconddiv}>
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
        <div className={styles.griddiv}>
          <div style={{ padding: "0rem", width: "50%" }}>
            <div>
              <h2 style={{ color: "#7065f0", marginBottom: "1rem" }}>
                Let's Connect
              </h2>
              <p style={{ fontSize: "0.85rem" }}>
                Let's get in touch. Fill the form below to send us message.
              </p>
              <p style={{ fontSize: "0.85rem", marginTop: "0rem" }}>
                Our team will contact you soon.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      width: "90%",
                    }}
                  >
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="First Name"
                      className={styles.searchText}
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
                      className={styles.searchText}
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
                      type="digit"
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

                      width: "90%",
                      height: "2rem",
                      backgroundColor: "#7065f0",

                      border: "none",
                      color: "white",
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "0rem",
              // marginLeft: "-2rem",

              width: "40%",
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
        </div>
      </div>
    </div>
  );
};

export default Modal;
