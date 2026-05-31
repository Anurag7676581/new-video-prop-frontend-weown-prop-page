import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import bedroom_logo from "./bedroom_logo.png";
import bathroom_logo from "./bathroom_logo.png";
import villa_logo from "./Villa_logo.png";
import Button from "../../Atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../../service/apiGateway";
import { useSelector } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { TbChartPie } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";

export const GroupPropertycard = ({
  _id,
  name,
  images,
  amenities,
  price,
  type,
  description,
  detail1,
  detail2,
  detail3,
  marginright,
  marginBottom,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isheadingExpanded, setIsheadingExpanded] = useState(false);
  const [shortlisted, setShortlisted] = useState(false);

  // Mock investment data (would come from API in real implementation)
  const [investmentData, setInvestmentData] = useState({
    expectedReturn: Math.floor(Math.random() * 15) + 8, // 8-22% ROI
    investmentProgress: Math.floor(Math.random() * 100), // 0-100% progress
    minInvestment: (Math.floor(Math.random() * 10) + 1) * 500, // $500-$5000
    totalInvestors: Math.floor(Math.random() * 100) + 5, // 5-105 investors
    daysLeft: Math.floor(Math.random() * 60) + 5 // 5-65 days left
  });

  const userDetails = useSelector((store) => store.user);
  const navigate = useNavigate();

  // Truncation styles for text
  const descStyles = {
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };

  const headingStyles = {
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };

  const handleAddToWishlist = async (productId) => {
    if (userDetails?.isLoggedIn) {
      try {
        const response = await api.post(
          `https://api.weown.ai/shortlist/`,
          {
            user_id: userDetails?.user_id,
            properties: [productId],
          }
        );
        setShortlisted(true);
      } catch (error) {
        console.log("error while add to wishlist: ", error);
      }
    } else {
      alert("Sorry!!! You are not logged in");
      navigate("/login");
    }
  };

  const checkIfShortlisted = async () => {
    try {
      const response = await api.get(`/shortlist/?id=${userDetails?.user_id}`);
      if (response?.data?.properties?.length > 0) {
        if (response?.data?.properties?.includes(_id)) setShortlisted(true);
      }
    } catch (error) {
      console.log("error while checking shorlisted property", error);
    }
  };

  useEffect(() => {
    if (userDetails?.isLoggedIn) {
      checkIfShortlisted();
    }
  }, [userDetails?.isLoggedIn]);

  // Format price to currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate investment amount from price
  const calculateMinInvestment = () => {
    const numericPrice = parseFloat(price?.replace(/[^0-9.-]+/g, "")) || 500000;
    return Math.round(numericPrice * 0.01); // 1% of property value as minimum investment
  };

  return (
    <div className={styles.maindiv}>
      <div className={styles.imagediv}>
        {images?.length > 0 ? (
          <img
            src={images[0]}
            alt={"Property Image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
              backgroundColor: "#E1E1E1",
            }}
            className={styles.ogimg}
          />
        ) : (
          <Skeleton
            width="100%"
            height="100%"
            borderRadius="10px"
          />
        )}

        {/* Wishlist button */}
        <div
          className={styles.wishlist_btn}
          onClick={() => handleAddToWishlist(_id)}
        >
          {shortlisted ? (
            <FaHeart color="red" size="20" />
          ) : (
            <FaRegHeart color="white" size="15" />
          )}
        </div>

        {/* Investment progress badge */}
        <div className={styles.investmentBadge}>
          <span>{investmentData.investmentProgress}% Funded</span>
        </div>
      </div>

      {/* Property title and description */}
      <div className={styles.description}>
        <div
          style={{
            display: "flex",
            flexDirection: isheadingExpanded ? "column" : "row",
            alignItems: "baseline",
            gap: "0.2rem",
          }}
        >
          <div
            className={styles.heading}
            style={!isheadingExpanded ? headingStyles : null}
          >
            {name}
          </div>
          <span
            style={{
              cursor: "pointer",
              fontSize: isheadingExpanded ? "0.75rem" : "1rem",
              fontWeight: "600",
            }}
            onClick={() => setIsheadingExpanded(!isheadingExpanded)}
          >
            {isheadingExpanded ? "less" : "..."}
          </span>
        </div>
        
        <div
          style={{
            display: "flex",
            flexDirection: isDescExpanded ? "column" : "row",
            alignItems: "baseline",
            gap: "0.2rem",
          }}
        >
          <div
            className={styles.subheading}
            style={!isDescExpanded ? descStyles : null}
          >
            {description}
          </div>
          <span
            style={{
              cursor: "pointer",
              fontSize: isDescExpanded ? "0.75rem" : "1rem",
              fontWeight: "600",
            }}
            onClick={() => setIsDescExpanded(!isDescExpanded)}
          >
            {isDescExpanded ? "Read less" : "..."}
          </span>
        </div>
      </div>

      {/* Investment details */}
      <div className={styles.investmentDetails}>
        <div className={styles.investmentItem}>
          <TbChartPie className={styles.investIcon} />
          <div className={styles.investData}>
            <span className={styles.investLabel}>Expected ROI</span>
            <span className={styles.investValue}>{investmentData.expectedReturn}%</span>
          </div>
        </div>
        <div className={styles.investmentItem}>
          <BiMoney className={styles.investIcon} />
          <div className={styles.investData}>
            <span className={styles.investLabel}>Min. Investment</span>
            <span className={styles.investValue}>${investmentData.minInvestment}</span>
          </div>
        </div>
        <div className={styles.investmentItem}>
          <FaUsers className={styles.investIcon} />
          <div className={styles.investData}>
            <span className={styles.investLabel}>Investors</span>
            <span className={styles.investValue}>{investmentData.totalInvestors}</span>
          </div>
        </div>
      </div>

      {/* Property features */}
      <div className={styles.details}>
        <div className={styles.capsule}>
          <div>
            <img
              src={bedroom_logo}
              style={{ height: "1rem", width: "1rem" }}
              alt="logo"
            />
          </div>
          <span style={{ whiteSpace: "nowrap" }}>
            {`${amenities?.bedrooms || 3} Bedrooms`}
          </span>
        </div>
        <div className={styles.capsule}>
          <div>
            <img
              src={bathroom_logo}
              style={{ height: "1rem", width: "1rem" }}
              alt="logo"
            />
          </div>
          <span style={{ whiteSpace: "nowrap" }}>
            {`${amenities?.bathrooms || 2} Bathrooms`}
          </span>
        </div>
        <div className={styles.capsule}>
          <div>
            <img
              src={villa_logo}
              style={{ height: "1rem", width: "1rem" }}
              alt="logo"
            />
          </div>
          <span style={{ whiteSpace: "nowrap" }}>{`${type || "Villa"}`}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${investmentData.investmentProgress}%` }}
        ></div>
      </div>
      <div className={styles.deadlineInfo}>
        <span className={styles.progressText}>{investmentData.daysLeft} days left</span>
      </div>

      {/* Pricing and action button */}
      <div className={styles.pricediv}>
        <div className={styles.pricesection}>
          <div style={{ fontSize: "0.8rem" }}>Total Value</div>
          <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{price}</div>
        </div>
        <Link to={`/group_property_description/${_id}`}>
          <div className={styles.propertyButton}>
            <div>
              <Button type="primary">Invest Now</Button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GroupPropertycard;