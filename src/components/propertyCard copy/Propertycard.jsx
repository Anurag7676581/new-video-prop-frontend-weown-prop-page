import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import bedroom_logo from "./bedroom_logo.png";
import propertyimage from "./property.png";
import bathroom_logo from "./bathroom_logo.png";
import villa_logo from "./Villa_logo.png";
import Button from "../../Atoms/Button";
import Chip from "../../Atoms/Chip";
import wishlist_btn from "./wishlist_btn.png";
import { Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoFolder } from "react-icons/io5";
import api from "../../service/apiGateway";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../auth/index";

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";


export const Propertycard = ({
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
  console.log("property card->", name)
  // const [detail1, detail2, detail3] = features;
  const [isLoading, setIsLoading] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isheadingExpanded, setIsheadingExpanded] = useState(false);
  const [isdetailExpanded, setIsdetailExpanded] = useState(false);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

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

  const detailStyles = {
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };

  const userDetails = useSelector((store) => store.user);
  const navigate = useNavigate();


  const [shortlisted, setShortlisted] = useState(false);


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
        console.log("success add to wishlist", response.data);

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
      console.log("dekh rha huun");
      const response = await api.get(`/shortlist/?id=${userDetails?.user_id}`);
      if (response?.data?.properties?.length > 0) {
        console.log("h bhai");
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


  return (
    <div
      className={styles.maindiv}
      style={{ marginRight: marginright, marginBottom: marginBottom }}
    >
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
          // onLoad={handleImageLoaded}
          />
        ) : (
          <Skeleton
            width="100%"
            height="100%"
            borderRadius="10px"
          // baseColor="#202020"
          // highlightColor="#444"
          // duration={4}
          />
        )}

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
      </div>
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

      <div
        className={styles.details}
      // style={!isdetailExpanded ? detailStyles : null}
      >
        <div className={styles.capsule}>
          <div>
            <img
              src={bedroom_logo}
              style={{ height: "1rem", width: "1rem" }}
              alt="logo"
            />
          </div>
          <span
            style={{ whiteSpace: "nowrap" }}
          >{`${amenities?.bedrooms} Bedrooms`}</span>
        </div>
        <div className={styles.capsule}>
          <div>
            <img
              src={bathroom_logo}
              style={{ height: "1rem", width: "1rem" }}
              alt="logo"
            />
          </div>
          <span
            style={{ whiteSpace: "nowrap" }}
          >{`${amenities?.bathrooms} Bathrooms`}</span>
        </div>
        <div className={styles.capsule}>
          <div>
            <img
              src={villa_logo}
              style={{ height: "1rem", width: "1rem" }}
              alt="logo"
            />
          </div>
          <span style={{ whiteSpace: "nowrap" }}>{`${type}`}</span>
        </div>
        {/* <span
          style={{ cursor: "pointer", fontSize: "0.8rem" }}
          onClick={() => setIsDescExpanded(!isDescExpanded)}
        >
          {isDescExpanded ? "close" : "..."}
        </span> */}
      </div>

      <div className={styles.pricediv}>
        <div className={styles.pricesection}>
          <div style={{ fontSize: "0.8rem" }}>Price</div>
          <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{price}</div>
        </div>
        <Link to={`/property_description/${_id}`}>
          <div className={styles.propertyButton}>
            <div>
              <Button type="primary">View property</Button>
            </div>
          </div>
        </Link>
      </div>
      {/* <Chip></Chip> */}
    </div>
  );
};
