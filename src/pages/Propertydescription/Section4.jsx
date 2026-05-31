import React from "react";
import styles from "./styles.module.css";
import homelogo from "./homelogo.svg";
import zoomlogo from "./zoomlogo.svg";
import locationimg from "./locationimg.svg";
import Map from "../../components/map/Map";

const Section4 = ({ location }) => {
  const [activeCategory, setActiveCategory] = React.useState("Restaurants");

  const list1 = [
    "Restaurants",
    "Pools",
    "Markets",
    "Schools",
    "Hospital",
    "Metro",
  ];

  // Use location data from props if available
  const latitude = location?.latitude || 25.2048; // Default to Dubai if not provided
  const longitude = location?.longitude || 55.2708;
  const apiKey = ""; // Should be in .env but keeping it empty for robustness

  return (
    <div className={styles.section4Container}>
      <div className={styles.headerRow}>
        <div className={styles.titleSection}>
          <h4 className={styles.title}>Explore Neighbourhood</h4>
          <p className={styles.subtitle}>
            Find clarity and convenience in the area surrounding this property.
            Discover essential amenities just steps away.
          </p>
        </div>
        <button className={styles.fullMapViewBtn}>
          View Dynamic Map
        </button>
      </div>

      <div className={styles.mapWrapper}>
        <Map apiKey={apiKey} latitude={latitude} longitude={longitude} />
      </div>

      <div className={styles.categoriesSection}>
        <div className={styles.categoriesList}>
          {list1.map((btnname, index) => {
            const isActive = activeCategory === btnname;
            return (
              <div
                key={btnname}
                onClick={() => setActiveCategory(btnname)}
                className={`${styles.categoryBtn} ${isActive ? styles.activeCategory : ""}`}
              >
                <div className={styles.iconBox}>
                  <img
                    src={homelogo}
                    alt={btnname}
                    className={isActive ? styles.activeIcon : ""}
                  />
                </div>
                <span>{btnname}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.zoomControl}>
          <img src={zoomlogo} alt="zoom" />
        </div>
      </div>
    </div>
  );
};


export default Section4;
