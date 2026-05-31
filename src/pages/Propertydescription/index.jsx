import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Section1 from "./Section1.jsx";
import Section2 from "./Section2.jsx";
import Section3 from "./Section3.jsx";
import Section4 from "./Section4.jsx";
import Section5 from "./Section5.jsx";
import Section6 from "./Section6.jsx";
import Section7 from "./Section7.jsx";
import Section8 from "./Section8.jsx";
import Section9 from "./Section9.jsx";
import Section10 from "./Section10.jsx";
import Section11 from "./Section11.jsx";
import Section12 from "./Section12.jsx";
import useGetPropertyDetails from "../../hooks/useGetPropertyDetails.js";
import usePropertyIdentifier from "../../hooks/usePropertyIdentifier.js";

const PropertyDescription = () => {
  const section1 = useRef(null);
  const section2 = useRef(null);
  const section3 = useRef(null);
  const section4 = useRef(null);
  const section5 = useRef(null);
  const section6 = useRef(null);

  const { identifier } = usePropertyIdentifier();

  const { loading, error, data } = useGetPropertyDetails(identifier);

  const {
    amenities,
    pricing_details,
    name,
    description,
    type,
    location,
    size,
    features,
    images,
    builder,
    iframe,
    floor_images,
    view3durl,
    _id: propertyId,
  } = data || {};

  const id = propertyId || identifier;

  const [stick, setStick] = useState(false);
  const [section, setSection] = useState(1);
  const [activeTab, setActiveTab] = useState("Overview");
  const reducescroll = 76;

  const sectionDefaultTab = {
    1: "Overview",
    2: "Highlights",
    3: "Pricing Details",
    4: "Map View",
    5: "Contact Builder",
    6: "Reviews",
  };
  const [reviewAdded, setReviewAdded] = useState(0);

  const handleReviewAdded = () => {
    setReviewAdded((prev) => prev + 1);
  };

  const handlescroll = () => {
    if (window.scrollY >= 76) setStick(true);
    else setStick(false);

    let nextSection = 1;

    if (
      section2?.current &&
      window.scrollY >= section2.current.offsetTop - reducescroll &&
      window.scrollY <=
        section2.current.offsetTop + section2.current.offsetHeight - reducescroll
    ) {
      nextSection = 2;
    } else if (
      section3?.current &&
      window.scrollY >= section3.current.offsetTop - reducescroll &&
      window.scrollY <=
        section3.current.offsetTop + section3.current.offsetHeight - reducescroll
    ) {
      nextSection = 3;
    } else if (
      section4?.current &&
      window.scrollY >= section4.current.offsetTop - reducescroll &&
      window.scrollY <=
        section4.current.offsetTop + section4.current.offsetHeight - reducescroll
    ) {
      nextSection = 4;
    } else if (
      section5?.current &&
      window.scrollY >= section5.current.offsetTop - reducescroll &&
      window.scrollY <=
        section5.current.offsetTop + section5.current.offsetHeight - reducescroll
    ) {
      nextSection = 5;
    } else if (
      section6?.current &&
      window.scrollY >= section6.current.offsetTop - reducescroll &&
      window.scrollY <=
        section6.current.offsetTop + section6.current.offsetHeight - reducescroll
    ) {
      nextSection = 6;
    }

    if (nextSection !== section) {
      setSection(nextSection);
      setActiveTab(sectionDefaultTab[nextSection]);
    }
  };

  useEffect(() => {
    handlescroll();
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  const handlesectionScroll = (sectionId, tabLabel) => {
    setSection(sectionId);
    setActiveTab(tabLabel || sectionDefaultTab[sectionId] || "Overview");

    const sectionRef =
      sectionId === 2
        ? section2
        : sectionId === 3
        ? section3
        : sectionId === 4
        ? section4
        : sectionId === 5
        ? section5
        : sectionId === 6
        ? section6
        : null;

    if (!sectionRef) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - reducescroll,
        behavior: "smooth",
      });
    }
  };

  if (loading && !data) {
    return <div className={styles.loadingState}>Loading property...</div>;
  }

  if (error && !data) {
    return (
      <div className={styles.loadingState}>
        Unable to load property. Check the URL and try again.
      </div>
    );
  }

  return (
    <>
      <div className={styles.maindiv}>
        <div
          ref={section1}
          id="section1"
          className={` ${stick ? styles.section1stick : styles.section1}`}
        >
          <Section1
            stick={stick}
            activeTab={activeTab}
            handlesectionScroll={handlesectionScroll}
          />
        </div>

        <div className={styles.seconddiv}>
          <div className={styles.section2} id="section2" ref={section2}>
            <Section2
              name={name}
              description={description}
              builder={builder}
              amenities={amenities}
              type={type}
              features={features}
              images={images}
              size={size}
              iframe={iframe}
              floor_images={floor_images}
              view3durl={view3durl}
              id={id}
              city={location?.city}
            />
          </div>
          <div className={styles.section3} id="section3 " ref={section3}>
            <Section3 pricingdetails={pricing_details} />
          </div>
          <div className={styles.section4} id="section4" ref={section4}>
            <Section4 location={location} />
          </div>
          <div className={styles.section5} id="section5" ref={section5}>
            <Section5 name={name} id={id} />
          </div>

          <div className={styles.section6} id="section6" ref={section6}>
            <Section6 name={name} id={id} reviewAdded={reviewAdded} />
          </div>
          <div className={styles.section7} id="section7">
            <Section7 />
          </div>
          <div className={styles.section8} id="section8">
            <Section8 builder={builder} />
          </div>

          <div className={styles.section9}>
            <Section9 id={id} />
          </div>
          <div className={styles.section10}>
            <Section10 id={id} />
          </div>
          <div className={styles.section11}>
            <Section11 />
          </div>

          <div className={styles.section12}>
            <Section12 id={id} handleReviewAdded={handleReviewAdded} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDescription;
