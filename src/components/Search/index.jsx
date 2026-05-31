import React, { useEffect, useRef, useState } from "react";
import Input from "../../Atoms/input";
import Button from "../../Atoms/Button";
import classNames from "classnames";
import styles from "./styles.module.css";
import down_arrow from "./down_arrow.svg";
import { Link } from "react-router-dom";
import Searchdropdown from "../../Atoms/searchdropdown";

const Search = () => {
  const location = ["Banglore", "Manali", "Ooty", "Gurugram"];

  return (
    <div>
      <div className={classNames(styles.search)}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0rem",
            // background: "black",
          }}
          className={styles.searchover}
        >
          <Searchdropdown
            dropdownname={"Banglore"}
            logo={down_arrow}
            style={{
              bgcolor: "white",
              border: "none",
              droplogobg: "none",
              namecolor: "#0F0B3E",
              flexgap: "0.5rem",
              selectBoxwidth: "10%",
            }}
            list={location}
          />
          {/* <select
            style={{
              border: "none",
              color: "#0F0B3E",
              fontSize: "1rem",
              fontWeight: "600",
              outline: "none",
              width: "20%",
              // gap: "2rem",
            }}
          >
            {location.map((obj, index) => {
              return (
                <option
                  value={obj}
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    padding: "2rem 0",
                  }}
                >
                  {obj}
                </option>
              );
            })}
          </select> */}

          <div className={styles.inputBox}>
            <input
              placeholder={"Search for locality, landmark or builder"}
              // onChange={(value) => {
              //   serachInputHandler(value);
              // }}
              style={{
                fontSize: "1rem",
                fontWeight: "550",
                letterSpacing: "normal",
                width: "100%",
                height: "100%",
                background: "transparent",
                // color: "white",

                outline: "none",
                border: "none",
              }}
            />
          </div>
        </div>

        <Link to={"/properties_filter"}>
          <div>
            <Button type="primary">Search</Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Search;
