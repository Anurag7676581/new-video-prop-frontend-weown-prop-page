import React from "react";
import styles from "./styles.module.css";
import EMI from "./EMI.svg";
import stardesign2 from "./stardesign2.svg";
import IntroContainer from "../../Atoms/introContainer/IntroContainer";

const Section11 = () => {
  const faqs = [
    {
      heading: "EMI Calculator",
      para: "Learn how to use our user-friendly search tools to find properties that match your criteria.",
    },
    {
      heading: "EMI Calculator",
      para: "Learn how to use our user-friendly search tools to find properties that match your criteria.",
    },
    {
      heading: "EMI Calculator",
      para: "Learn how to use our user-friendly search tools to find properties that match your criteria.",
    },
  ];

  return (
    <div>
      <IntroContainer
        stardesign={stardesign2}
        heading="Let's Get To Numbers"
        desc={`Find answers to common questions about Estateins's services, property
          listing, and the real estate process. We're here to provide clarity
          and assist you every tep of the way `}
        btntext="View Details"
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          //   alignItems: "center",
          gap: "1rem",
          width: "100%",
          overflow: "auto",
          marginTop: "4rem",
        }}
      >
        {faqs.map((faq, index) => {
          return (
            <div
              style={{
                padding: "2rem",
                // width: "45%",
                // height: "rem",
                borderRadius: "10px",
                backgroundColor: "rgba(112, 101, 240, 0.13)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <div style={{ height: "4rem" }}>
                <img
                  src={EMI}
                  alt="img"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div style={{ fontWeight: "600", whiteSpace: "nowrap" }}>
                {faq.heading}
              </div>
              <p style={{ fontSize: "0.9rem" }}>{faq.para}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section11;
