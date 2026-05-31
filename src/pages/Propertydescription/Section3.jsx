import React from "react";
import styles from "./styles.module.css";
import housegrid1 from "./housegrid1.svg";
import housegrid2 from "./housegrid2.svg";
import home1 from "./home1.svg";
import "@google/model-viewer/dist/model-viewer";
import houseinterior3 from "./house_compressed.glb";
import SocietyGlb from "./Society_compressed.glb";
import { displayPrice } from "../../utils/propertyDisplay";

const Section3 = ({ pricingdetails }) => {
  const list1 = [
    {
      heading: "Property Transfer Tax",
      price: displayPrice(pricingdetails?.additional_price?.property_transfer_tax),
      para: "Based on the sales price and local regulations",
    },
    {
      heading: "Legal Fees",
      price: displayPrice(pricingdetails?.additional_price?.legal_fees),
      para: "Approximate cost for legal services, including the transfer",
    },
    {
      heading: "Home Inspection",
      price: displayPrice(pricingdetails?.additional_price?.home_inspection),
      para: "Recommended for due dilligence",
    },
    {
      heading: "Property Insurance",
      price: displayPrice(pricingdetails?.additional_price?.property_insurance),
      para: "Annual cost for comprhensive property insurance",
    },
  ];

  const list13 = [
    {
      heading: "Mortgage Fees",
      price: displayPrice(pricingdetails?.additional_price?.mortgage_fees),
      para: "if applicable, consult with your lender for specific details",
    },
  ];
  const list2 = [home1, home1, home1, home1, home1, home1, home1, home1, home1];
  return (
    <div>
      <div className={styles.section3div1}>
        <div>
          <h4
            style={{
              fontSize: "2rem",
              fontWeight: "650",
              whiteSpace: "wrap",
            }}
          >
            Comprehensive Pricing Details
          </h4>
          <p
            style={{ marginTop: "0.9rem", fontWeight: "550" }}
            className={styles.desc}
          >
            At Estatein, transparency is key. We want you to have a clear
            undertanding of all costs associated with your property investment.
            Below, we break down the pricing for Seaside Sereanity Villa to help
            you make an informed decision
          </p>
        </div>
        <div
          style={{
            padding: "1.5rem 2rem",
            border: "1px solid #7065f0",
            borderRadius: "10px",
            color: "#7065f0",
            marginTop: "5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            whiteSpace: "noWrap",
            overflow: "auto",
          }}
        >
          <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>Note</span>
          <span
            style={{
              padding: "0.2rem 0.5rem",
              borderLeft: "1px solid #7065f0",

              fontWeight: "550",

              fontSize: "0.9rem",
            }}
          >
            The figures provided above are estimates and may vary depending on
            the property, location, and individual circumstances.
          </span>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <p style={{ fontSize: "0.9rem", fontWeight: "550" }}>Listing Price</p>
          <p
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              marginTop: "0.5rem",
              whiteSpace: "noWrap",
            }}
          >
            {displayPrice(pricingdetails?.listing_price)}
          </p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "3rem",
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
            }}
          >
            Additonal Fees
          </p>
          <div
            style={{
              padding: "0.8rem 1rem",
              border: "1px solid black",
              borderRadius: "10px",
              fontSize: "0.9rem",
              fontWeight: "550",
              whiteSpace: "noWrap",
            }}
          >
            Learn More
          </div>
        </div>

        <div className={styles.section3grid}>
          {list1.map((obj, index) => {
            return (
              <div
                style={{
                  backgroundColor: "rgba(112, 101, 240, 0.09)",
                  padding: "1rem",
                  borderRadius: "10px",
                  // width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  overflow: "auto",
                }}
              >
                <p style={{ color: "#7065f0", fontSize: "0.9rem" }}>
                  {obj.heading}
                </p>
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <span style={{ color: "#7065f0", fontWeight: "600" }}>
                    {obj.price}
                  </span>
                  <div
                    style={{
                      backgroundColor: "#7065f0",
                      color: "white",
                      borderRadius: "999px",
                      padding: "0.5rem 0.8rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap" }}>{obj.para}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginInline: "auto", width: "95%" }}>
          {list13.map((obj, index) => {
            return (
              <div
                style={{
                  backgroundColor: "rgba(112, 101, 240, 0.09)",
                  padding: "1rem 4rem 1rem 1rem",
                  borderRadius: "10px",

                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",

                  overflow: "auto",
                }}
              >
                <p style={{ color: "#7065f0", fontSize: "0.9rem" }}>
                  {obj.heading}
                </p>
                <div
                  style={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <span style={{ color: "#7065f0", fontWeight: "600" }}>
                    {obj.price}
                  </span>
                  <div
                    style={{
                      backgroundColor: "#7065f0",
                      color: "white",
                      borderRadius: "999px",
                      padding: "0.5rem 0.8rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap" }}>{obj.para}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section3;
