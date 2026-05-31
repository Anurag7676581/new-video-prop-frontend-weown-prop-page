import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import home1 from "./home1.svg";
import home2 from "./home2.svg";
import home3 from "./home3.svg";
import housegrid1 from "./housegrid1.svg";
import housegrid2 from "./housegrid2.svg";
import logo1 from "./logo1.svg";
import logo2 from "./logo2.svg";
import user from "./user.svg";
import shape1 from "./shape1.svg";
import shape2 from "./shape2.svg";
import shape3 from "./shape3.svg";
import shape4 from "./shape4.svg";
import shape5 from "./shape5.svg";
import shape6 from "./shape6.svg";
import light from "./light.svg";
import location from "./location.svg";
import heart from "./heart.svg";
import share from "./share.svg";
import customize from "./customize.svg";
import Play from "./Play.svg";
import "@google/model-viewer/dist/model-viewer";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Atoms/Button";
import Skeleton from "react-loading-skeleton";
import api from "../../service/apiGateway";
import { useSelector } from "react-redux";
import LaunchExperienceModal from "../../components/launchExperience/LaunchExperienceModal";
import { extractSlugFromView3dUrl } from "../../service/videoPropApi";
import {
  displayArea,
  displaySwimmingPool,
  displayValue,
  PROPERTY_FIELD_DEFAULTS,
} from "../../utils/propertyDisplay";

const Section2 = ({
  name,
  description,
  builder,
  amenities,
  type,
  features,
  images,
  size,
  iframe,
  floor_images,
  id,
  city,
  view3durl,
}) => {
  const allImages = [...(images || []), ...(floor_images || [])];

  const descriptionlist = [
    {
      id: 1,
      img: shape1,
      type: "Bedrooms",
      about: displayValue(amenities?.bedrooms, PROPERTY_FIELD_DEFAULTS.bedrooms),
    },
    {
      id: 2,
      img: shape2,
      type: "Bathrooms",
      about: displayValue(amenities?.bathrooms, PROPERTY_FIELD_DEFAULTS.bathrooms),
    },
    {
      id: 3,
      img: shape3,
      type: "Area",
      about: displayArea(size, PROPERTY_FIELD_DEFAULTS.area),
    },
    {
      id: 4,
      img: shape4,
      type: "Swimming pools",
      about: displaySwimmingPool(
        amenities?.swimmingpool,
        PROPERTY_FIELD_DEFAULTS.swimmingpool
      ),
    },
    {
      id: 5,
      img: shape5,
      type: "Location",
      about: displayValue(city, PROPERTY_FIELD_DEFAULTS.city),
    },
    {
      id: 6,
      img: shape6,
      type: "Type",
      about: displayValue(type, PROPERTY_FIELD_DEFAULTS.type),
    },
    {
      id: 7,
      img: shape1,
      type: "Construction Stage",
      about: displayValue(
        amenities?.construction_stage,
        PROPERTY_FIELD_DEFAULTS.construction_stage
      ),
    },
    {
      id: 8,
      img: shape2,
      type: "Security",
      about: displayValue(amenities?.security, PROPERTY_FIELD_DEFAULTS.security),
    },
    {
      id: 9,
      img: shape3,
      type: "Parking",
      about: displayValue(amenities?.parking, PROPERTY_FIELD_DEFAULTS.parking),
    },
  ];

  const [launchimgid, setLaunchimgid] = useState(0);
  const [launchexpbtn, setLaunchexpbtn] = useState(false);
  const [launchexp, setLaunchexp] = useState(false);

  const handleopenLaunchexp = () => {
    setLaunchexpbtn(true);
  };

  const handlecloseLaunchexp = () => {
    setLaunchexpbtn(false);
  };

  const [builderdata, setBuilderData] = useState(null);

  const fetchdata = async () => {
    try {
      const response = await api.get(`/builder/profile/${builder}`);
      setBuilderData(response.data);
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };

  useEffect(() => {
    if (builder) {
      fetchdata();
    }
  }, [builder]);

  const [shortlisted, setShortlisted] = useState(false);
  const userDetails = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleAddToWishlist = async () => {
    if (userDetails?.isLoggedIn) {
      try {
        const response = await api.post(
          `https://api.weown.ai/shortlist/`,
          {
            user_id: userDetails?.user_id,
            properties: [id],
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
      const response = await api.get(`/shortlist/?id=${userDetails?.user_id}`);
      if (response?.data?.properties?.length > 0) {
        if (response?.data?.properties?.includes(id)) setShortlisted(true);
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
    <div className={styles.section2main}>
      <div className={styles.section2intro}>
        <div className={styles.section2heading}>
          <h4 style={{ fontSize: "1.5rem", fontWeight: "650", flexWrap: "wrap" }}>
            {name || "Property"}
          </h4>
          <div style={{
            border: "1px solid #E3E3E3",
            borderRadius: "5px",
            padding: "0.5rem",
            fontSize: "0.8rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}>
            <div style={{ width: "1rem" }}>
              <img src={location} alt="img" style={{ width: "100%" }} />
            </div>
            <span style={{ whiteSpace: "noWrap" }}>
              {displayValue(city, PROPERTY_FIELD_DEFAULTS.city)}, India
            </span>
          </div>
        </div>
        <div className={styles.section2buttondiv}>
          <div
            style={{
              backgroundColor: "rgba(112, 101, 240, 0.12)",
              padding: "0.6rem 1.5rem",
              borderRadius: "5px",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleAddToWishlist}
          >
            <span style={{
              color: "grey",
              fontSize: "0.9rem",
              whiteSpace: "noWrap",
            }}>
              Save
            </span>
            <div style={{ width: "1rem" }}>
              <img src={heart} alt="img" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section2imgdivp}>
        <div className={styles.section2imgdiv1}>
          {allImages?.length > 0
            ? allImages?.map((image, index) => {
              return (
                <div
                  key={index}
                  className={styles.imgtransformdiv}
                  onClick={() => setLaunchimgid(index)}
                >
                  <img
                    src={image}
                    alt="home_img"
                    style={{
                      width: "100%",
                      minHeight: "100%",
                      borderRadius: "5px",
                      objectFit: "cover",
                    }}
                    className={styles.ogimg}
                  />
                </div>
              );
            })
            : Array(9)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: "6rem",
                    maxWidth: "6rem",
                    height: "5rem",
                  }}
                >
                  <Skeleton
                    width="100%"
                    height="100%"
                    borderRadius="5px"
                  />
                </div>
              ))}
        </div>

        <div
          className={styles.section2imgdiv2}
          onMouseOver={handleopenLaunchexp}
          onMouseLeave={handlecloseLaunchexp}
        >
          <div style={{ width: "100%", aspectRatio: "2.5", background: "white", borderRadius: "12px" }}>
            {allImages?.length > 0 ? (
              <img
                src={allImages[launchimgid]}
                alt="home_img"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  objectFit: "cover",
                  background: "white",
                }}
              />
            ) : (
              <Skeleton width="100%" height="100%" borderRadius="5px" />
            )}
          </div>

          <div className={
            allImages?.length > 0 && launchexpbtn
              ? styles.launchexpdivhover
              : styles.launchexpdivhovernot
          }>
            <div className={styles.launchexpbtndivp}></div>
            {<div
              className={
                allImages?.length > 0 && launchexpbtn
                  ? styles.launchexpbtn
                  : styles.launchexpbtnnot
              }
              onClick={() => setLaunchexp(true)}
            >
              {allImages?.length > 0 && launchexpbtn && (
                <>
                  <div style={{ width: "1rem" }}>
                    <img src={Play} alt="img" style={{ width: "100%" }} />
                  </div>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      whiteSpace: "noWrap",
                      cursor: "pointer",
                    }}
                    className={styles.buttontext}
                  >
                    LAUNCH EXPERIENCE
                  </button>
                </>
              )}
            </div>}
            {launchexp && (
              <LaunchExperienceModal
                onClose={() => setLaunchexp(false)}
                view3durl={view3durl}
                propertySlug={extractSlugFromView3dUrl(view3durl)}
                pageStyles={styles}
              />
            )}
          </div>
        </div>

        <div className={styles.section2imgdiv3}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}>
            <div style={{
              padding: "0.6rem",
              backgroundColor: "rgba(112, 101, 240, 0.14)",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
            }}>
              <img
                src={logo1}
                alt="logo_img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{
              padding: "0.6rem",
              backgroundColor: "rgba(112, 101, 240, 0.14)",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
            }}>
              <img
                src={logo2}
                alt="logo_img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{
              backgroundColor: "#7065f0",
              padding: "0.6rem 1rem",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }}>
              <div style={{ width: "0.8rem" }}>
                <img src={share} alt="logo_img" style={{ width: "100%" }} />
              </div>
              <span style={{ color: "white", fontSize: "0.9rem" }}>Share</span>
            </div>
            <div style={{
              backgroundColor: "rgba(112, 101, 240, 0.12)",
              padding: "0.6rem 1.5rem",
              borderRadius: "5px",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}>
              <span style={{
                color: "grey",
                fontSize: "0.9rem",
                whiteSpace: "noWrap",
              }}>
                Save
              </span>
              <div style={{ width: "1rem" }}>
                <img src={heart} alt="img" style={{ width: "100%" }} />
              </div>
            </div>
            <div style={{
              backgroundColor: "rgba(112, 101, 240, 0.12)",
              padding: "0.6rem 1.5rem",
              borderRadius: "5px",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}>
              <span style={{
                color: "grey",
                fontSize: "0.9rem",
                whiteSpace: "noWrap",
              }}>
                Customize
              </span>
              <div style={{ width: "1rem" }}>
                <img
                  src={customize}
                  alt="img"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.profilebuttondivp}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}>
                <div style={{ width: "3.5rem", aspectRatio: "1" }}>
                  {builderdata?.images?.length > 0 ? (
                    <img
                      src={builderdata?.images[0]}
                      alt="user img"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Skeleton width="100%" height="100%" />
                  )}
                </div>
                <div>
                  <p style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    whiteSpace: "noWrap",
                  }}>
                    {builderdata?.name}
                  </p>
                  <p style={{
                    fontSize: "0.75rem",
                    fontWeight: "bolder",
                    color: "#7065f0",
                    whiteSpace: "noWrap",
                  }}>
                    Builder
                  </p>
                </div>
              </div>
              <Link to={`/builder/${builder}`}>
                <div style={{
                  backgroundColor: "#7065f0",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}>
                  <button style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    whiteSpace: "noWrap",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}>
                    Visit
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section2descriptionp}>
        <div className={styles.section2description}>
          <h4 style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            whiteSpace: "noWrap",
          }}>
            Description
          </h4>
          <p style={{
            fontSize: "0.8rem",
            fontWeight: "600",
            lineHeight: "1.2rem",
          }}>
            {displayValue(description, PROPERTY_FIELD_DEFAULTS.description)}
          </p>

          <div className={styles.section2grid}>
            {descriptionlist?.map((obj, index) => {
              return (
                <div
                  style={{
                    paddingBlock: "1rem",
                    borderTop: "1px solid #E3E3E3",
                  }}
                >
                  <div
                    key={obj?.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      paddingInline: "1rem",
                      borderRight:
                        index !== 2 && index !== 5 && index !== 8
                          ? "1px solid #E3E3E3"
                          : "",
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}>
                      <span style={{ width: "1rem" }}>
                        <img
                          src={obj?.img}
                          alt="img"
                          style={{ width: "100%" }}
                        />
                      </span>
                      <span style={{
                        fontSize: "0.9rem",
                        fontWeight: "550",
                        whiteSpace: "noWrap",
                      }}>
                        {obj?.type}
                      </span>
                    </div>
                    <p style={{
                      fontSize: "1.1rem",
                      fontWeight: "650",
                      whiteSpace: "noWrap",
                    }}>
                      {obj?.about}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.section2features}>
          <h4 style={{
            fontSize: "1.1rem",
            fontWeight: "600",
          }}>
            Key Features and Amenities
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {features?.length > 0
              ? features?.map((text, index) => {
                return (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: " 1rem",
                    borderLeft: "1px solid #7065f0",
                    background: "linear-gradient(to right, #E3E3E3, #FFFFFF)",
                  }}>
                    <div style={{ width: "1rem" }}>
                      <img src={light} alt="img" style={{ width: "100%" }} />
                    </div>
                    <p style={{
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      lineHeight: "1.2rem",
                      whiteSpace: "noWrap",
                    }}>
                      {text}
                    </p>
                  </div>
                );
              })
              : Array(5)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: " 1rem",
                        borderLeft: "1px solid #7065f0",
                        background: "linear-gradient(to right, #E3E3E3, #FFFFFF)",
                      }}
                    >
                      <div style={{ width: "1rem" }}>
                        <img src={light} alt="img" style={{ width: "100%" }} />
                      </div>
                      <p style={{
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        lineHeight: "1.2rem",
                        whiteSpace: "noWrap",
                      }}>
                        features
                      </p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
