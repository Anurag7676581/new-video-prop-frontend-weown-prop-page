// Navbar.js

import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";

import Sidebar1 from "../../components/sidebar/Sidebar1";

import Navbar2 from "./Navbar2";
import Navbar1 from "./Navbar1";
import Navbarmob from "./Navbarmob";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/appslice";
// import Sidebar from "../sidebar/Sidebar";

function Navbar() {
  const sidebar = useSelector((store) => store.app.issidebaropen);
  const dispatch = useDispatch();
  const handlesideopen = () => {
    dispatch(toggleSidebar());
  };

  const changeNavbar = useSelector((store) => store.app.changeNavbar);

  const [mobsize, setMobSize] = useState(false);

  const handleresize = () => {
    if (window.innerWidth <= 900) setMobSize(true);
    else setMobSize(false);
  };

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => window.removeEventListener("resize", handleresize);
  });

  return (
    <div>
      <div>
        {sidebar && (
          <div
            className={styles.sidebarouterContainer}
            onClick={handlesideopen}
          ></div>
        )}
        {sidebar && <Sidebar1 />}
      </div>
      {mobsize ? <Navbarmob /> : !changeNavbar ? <Navbar1 /> : <Navbar2 />}
    </div>
  );
}

export default Navbar;
