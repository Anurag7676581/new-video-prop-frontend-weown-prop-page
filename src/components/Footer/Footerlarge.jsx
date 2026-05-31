import React from "react";
import styles from "./styles.module.css";
import logo from "./logo.png";
import arrow from "./arrow.png";
import facebook from "./facebook.png";
import linkedin from "./linkedin.png";
import twitter from "./twitter.png";
import youtube from "./youtube.png";

const Footerlarge = () => {
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
            <div className={styles.section}>
              <div>
                <div style={{ marginBottom: "0rem", fontWeight: "600" }}>
                  Home
                </div>
                <ul>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                </ul>
              </div>
            </div>
            <div className={styles.section}>
              <div>
                <div style={{ marginBottom: "0rem", fontWeight: "600" }}>
                  About Us
                </div>
                <ul>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                </ul>
              </div>
            </div>
            <div className={styles.section}>
              <div>
                <div style={{ marginBottom: "0rem", fontWeight: "600" }}>
                  Properties
                </div>
                <ul>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                </ul>
              </div>
            </div>
            <div className={styles.section}>
              <div>
                <div style={{ marginBottom: "0rem", fontWeight: "600" }}>
                  Services
                </div>
                <ul>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                </ul>
              </div>
            </div>
            <div className={styles.section}>
              <div>
                <div style={{ marginBottom: "0rem", fontWeight: "600" }}>
                  Contact Us
                </div>
                <ul>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                  <li>Pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className={styles.copyrightpara} style={{ marginRight: "1rem" }}>
            @2023 WeOwn. All Rights Reserved.
          </p>
          <p className={styles.copyrightpara}>Terms & Conditions.</p>
        </div>
        <div className={styles.contactdiv}>
          <div className={styles.socialdiv}>
            <img src={facebook} alt="img" style={{ height: "50%" }} />
          </div>
          <div className={styles.socialdiv}>
            <img src={linkedin} alt="img" style={{ height: "50%" }} />
          </div>
          <div className={styles.socialdiv}>
            <img src={twitter} alt="img" style={{ height: "50%" }} />
          </div>
          <div className={styles.socialdiv}>
            <img src={youtube} alt="img" style={{ height: "50%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footerlarge;
