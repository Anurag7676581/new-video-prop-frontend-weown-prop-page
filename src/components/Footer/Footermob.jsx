import React from "react";
import styles from "./footermob.module.css";
import logo from "./logo.png";
import arrow from "./arrow.png";
import facebook from "./facebook.png";
import linkedin from "./linkedin.png";
import twitter from "./twitter.png";
import youtube from "./youtube.png";
import whitedroplogo from "./whitedroplogo.svg";

const Footerlarge = () => {
  const list = [
    {
      id: 1,
      name: "Home",
    },
    {
      id: 2,
      name: "About Us",
    },
    {
      id: 3,
      name: "Properties",
    },
    {
      id: 4,
      name: "Services",
    },
    {
      id: 5,
      name: "Contact Us",
    },
  ];
  return (
    <div className={styles.footerdiv}>
      <div className={styles.footer}>
        <div className={styles.maindiv}>
          <div className={styles.grid}>
            <div className={styles.firstcol}>
              <div className={styles.logo}>
                <img src={logo} alt="logo" style={{ width: "100%" }} />
              </div>
              <div className={styles.searchbar}>
                <input type="email" placeholder="Enter Your Email" />
                <div className={styles.searchlogo}>
                  <img src={arrow} alt="img" style={{ width: "100%" }} />
                </div>
              </div>
              <p className={styles.consentpara}>
                By providing my email address I consent to be connected through
                email with marketing communications. For further information
                please visit out Terms of Use and Privacy Policy
              </p>
            </div>
            <div className={styles.sectiondivp}>
              {list.map((obj, index) => {
                return (
                  <div key={obj.id} className={styles.section}>
                    <div>
                      <div style={{ fontWeight: "550" }}>{obj.name}</div>
                    </div>
                    <div className={styles.droplogo}>
                      <img
                        src={whitedroplogo}
                        alt="img"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <p className={styles.copyrightpara} style={{}}>
            @2023 WeOwn. All Rights Reserved.
          </p>
          <p className={styles.copyrightpara}>Terms & Conditions.</p>
        </div>
        <div className={styles.contactdiv}>
          <div className={styles.socialdiv}>
            <img src={facebook} alt="img" style={{ height: "100%" }} />
          </div>
          <div className={styles.socialdiv}>
            <img src={linkedin} alt="img" style={{ height: "100%" }} />
          </div>
          <div className={styles.socialdiv}>
            <img src={twitter} alt="img" style={{ height: "100%" }} />
          </div>
          <div className={styles.socialdiv}>
            <img src={youtube} alt="img" style={{ height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footerlarge;
