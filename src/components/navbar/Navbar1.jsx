import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoImage from "./logo.png";
import Vector from "./Vector.png";
import styles from "./styles.module.css";
import NavDropdown from "../../Atoms/navdropdown";
import hamburger from "./hamburger.png";
import userimg from "./userimg.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/appslice";
import Chatbot from "../chatbot/Chatbot";

const Navbar1 = () => {
  const userDetail = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handlesideopen = () => {
    dispatch(toggleSidebar());
  };
  const navdropdownlist = [
    {
      category: "Residential",
      subcategories: [
        {
          heading: "Ready To Move",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
        {
          heading: "Under-Construction",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
        {
          heading: "Independent House",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
        {
          heading: "Builder Floor",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
      ],
    },
    {
      category: "Land/Plot",
      subcategories: [
        {
          heading: "Plots in different Cities",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
      ],
    },
    {
      category: "Commercial",
      subcategories: [
        {
          heading: "Office",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
        {
          heading: "Shop",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
        {
          heading: "Complex",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
        {
          heading: "Co-working",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
        {
          heading: "Mall",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
      ],
    },
    {
      category: "Top Localities",
      subcategories: [
        {
          heading: "Top Localities",
          para: "Constructed and finished properties that are ready for immediate occupancy",
        },
      ],
    },
  ];
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseOver = () => {
    setDropdownOpen(true);
  };

  const handleMouseOut = () => {
    setDropdownOpen(false);
  };
  return (
    <nav className={styles.navbar}>
      <Link to="/home">
        <div className={styles.logo}>
          <img
            src={LogoImage}
            alt="Logo"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Link>
      <div className={styles.navCenter}>
        <ul className={styles.navOptions}>
          <li
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.3rem",
              cursor: "pointer",
              // backgroundColor: "red",
              height: "85px",
            }}
            className={`${styles.view} ${styles.navoption}`}
            // onMouseOver={handleMouseOver}
          >
            <span>View & Buy</span>
            <div style={{ width: "0.7rem" }}>
              <img
                src={Vector}
                alt="arrow"
                style={{ width: "100%", height: "100%" }}
                className={`${styles.rotate180} ${
                  isDropdownOpen ? styles.rotate1802 : null
                }`}
              />
            </div>
          </li>
          <div className={styles.dropdown} onMouseOver={handleMouseOver}>
            <NavDropdown
              navdropdownlist={navdropdownlist}
              closeDropdown={handleMouseOut}
            />
          </div>

          {/* </li> */}

          <li className={styles.navoption}>
            <span style={{ cursor: "pointer" }}>Search Builders</span>
          </li>
          <Link
            to="/investment_homepage"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <li className={styles.navoption}>
              <span style={{ cursor: "pointer" }}>Group Investment</span>
            </li>
          </Link>

          <li className={styles.navoption}>
            <span style={{ cursor: "pointer" }}>List Property</span>
          </li>

          <li className={styles.navoption}>
            <span style={{ cursor: "pointer" }}>Compare</span>
          </li>
        </ul>
      </div>
      <div className={styles.navRight}>
        <div onClick={handlesideopen}>
          <img
            src={hamburger}
            alt="icon"
            style={{ height: "60%", width: "60%", cursor: "pointer" }}
          />
        </div>

        <Link to={"/activity"}>

          <div
            style={{
              backgroundColor: "white",
              // padding: "0.2rem",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "50%",
              marginLeft: "-0.5rem",
            }}
          >
            <img
              src={userimg}
              alt="icon"
              style={{ height: "50%", width: "50%" }}
            />
          </div>
        </Link>
        
        {/* AI Assistant Button */}
        <button className={styles.aiAssistantButton} title="AI Property Assistant" onClick={() => window.dispatchEvent(new Event('open-weown-chat'))}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="currentColor"/>
            <path d="M8 12H16V14H8V12ZM8 16H13V18H8V16Z" fill="currentColor"/>
          </svg>
          <span>AI Assistant</span>
        </button>
      </div>
      
      {/* Chatbot Component */}
      <Chatbot />
    </nav>
  );
};

export default Navbar1;
