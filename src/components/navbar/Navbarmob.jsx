import React from "react";
import styles from "./navbarmob.module.css";
import { Link } from "react-router-dom";
import LogoImage from "./logo.png";
import hamburgerNav from "./hamburgerNav.svg";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/appslice";
import Chatbot from "../chatbot/Chatbot";

const Navbarmob = () => {
  const dispatch = useDispatch();
  const handlesideopen = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div className={styles.navbar}>
      <Link to="/home">
        <div className={styles.logo}>
          <img
            src={LogoImage}
            alt="Logo"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Link>

      <div className={styles.hamburgerdiv} onClick={handlesideopen}>
        <img
          src={hamburgerNav}
          alt="img"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      
      {/* Chatbot Component for Mobile */}
      <Chatbot />
    </div>
  );
};

export default Navbarmob;
