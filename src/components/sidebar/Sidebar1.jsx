import React, { useState } from "react";
import styles from "./styles.module.css";

import down_arrow from "./down_arrow.svg";
import right_arrow from "./right_arrow.svg";
import SearchBardrop from "../../Atoms/dropdownlist";
import Sidebar2 from "./Sidebar2";
import a1 from "./1.svg";
import a2 from "./2.svg";
import a3 from "./3.svg";
import a4 from "./4.svg";
import a5 from "./5.svg";
import a6 from "./6.svg";
import a7 from "./7.svg";
import a8 from "./8.svg";
import a9 from "./9.svg";
import a10 from "./10.svg";
import a11 from "./11.svg";
import a12 from "./12.svg";
import star from "./star.svg";
import fraud from "./fraud.svg";
import Profilebox from "../../Atoms/profilebox";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from './../../auth/index';
import { setLogOut } from "../../redux/userSlice";

const Sidebar1 = () => {
  const userDetails=useSelector((store)=>store.user);
  const list1 = [
    {
      id: 1,
      img: a5,
      name: "For Buyers",
    },
    {
      id: 2,
      img: a6,
      name: "For Tenants",
    },

    {
      id: 3,
      img: a7,
      name: "For Owners",
    },
    {
      id: 4,
      img: a8,
      name: "For Dealers/Builders",
    },
  ];
  const list2 = [
    {
      id: 1,
      title: "Buy a home in Banglore",
      dropdownlist: [
        "Verified Properties",
        "Flats",
        "Builder Floors",
        "Independent House",
        "Plots/Land",
        "Service Apartments",
        "New Projects",
      ],
    },
    {
      id: 2,
      title: "Commercial in Banglore",
      dropdownlist: [
        "Verified Properties",
        "Ready to Move office spaces",
        "Co-working office spaces",
        "Shops",
        "Showrooms",
        "Industrial Lands/Plots",
        "Commercial Lands/Inst. Lands",
        "Agricultural/Farm Land",
      ],
    },
    {
      id: 3,
      title: "Top Areas for Residential",
      dropdownlist: [
        "Verified Properties",
        "Ready to Move office spaces",
        "Co-working office spaces",
        "Shops",
        "Showrooms",
        "Industrial Lands/Plots",
        "Commercial Lands/Inst. Lands",
        "Agricultural/Farm Land",
      ],
    },
    {
      id: 4,
      title: "Top Areas For Commercial",
      dropdownlist: [
        "Verified Properties",
        "Ready to Move office spaces",
        "Co-working office spaces",
        "Shops",
        "Showrooms",
        "Industrial Lands/Plots",
        "Commercial Lands/Inst. Lands",
        "Agricultural/Farm Land",
      ],
    },
  ];
  const list3 = [
    {
      id: 1,
      title: "Rent a home in Banglore",
      dropdownlist: [
        "All Properties",
        "Verified Properties",
        "Flats",
        "Builder Floors",
        "Independent House",
        "Serviced Apartments",
        "Studio Apartments/1 RK Flats",
      ],
    },
    {
      id: 2,
      title: "PG/Co-living in Banglore",
      dropdownlist: [
        "All Properties",
        "PG for Boys",
        "PG for Girls",
        "Single Room PG",
        "Double Sharing PG",
      ],
    },
    {
      id: 3,
      title: "Commercial in Banglore",
      dropdownlist: [
        "Verified Properties",
        "Ready to Move office spaces",
        "Co-working office spaces",
        "Shops",
        "Showrooms",
        "Industrial Lands/Plots",
        "Commercial Lands/Inst. Lands",
        "Agricultural/Farm Land",
      ],
    },
    {
      id: 4,
      title: "Top Areas For Residential",
      dropdownlist: [
        "Verified Properties",
        "Ready to Move office spaces",
        "Co-working office spaces",
        "Shops",
        "Showrooms",
        "Industrial Lands/Plots",
        "Commercial Lands/Inst. Lands",
        "Agricultural/Farm Land",
      ],
    },
    {
      id: 5,
      title: "Top Areas For Commercial",
      dropdownlist: [
        "Verified Properties",
        "Ready to Move office spaces",
        "Co-working office spaces",
        "Shops",
        "Showrooms",
        "Industrial Lands/Plots",
        "Commercial Lands/Inst. Lands",
        "Agricultural/Farm Land",
      ],
    },
  ];

  const list4 = [
    {
      id: 1,
      title: "Property Services",
      dropdownlist: ["Post Property for Free", "Owner Services"],
    },
  ];
  const list5 = [
    {
      id: 1,
      title: "For Dealers/Builders",
      dropdownlist: ["Post Property", "Dealer Services", "Builder Services"],
    },
  ];

  const arr = list1.map(() => false);
  const [issideopen, setIssideopen] = useState(arr);

  const handlesideopen = (id) => {
    const arr = issideopen.map(() => false);
    arr[id] = true;
    setIssideopen(arr);
  };

  const handlesideclose = (e, id) => {
    e.stopPropagation();
    const arr = [...issideopen];
    arr[id] = false;
    setIssideopen(arr);
  };

  const [openDropdown, setOpenDropdown] = useState(0);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? 0 : index);
  };
 const dispatch=useDispatch();
    const handlelogout = () => {
    dispatch(setLogOut());
  };
  const list = ["Contacted Property", "Seen Property", "Saved Search List"];

  return (
    <div className={`${styles.sidebarContainer}  `}>
      <Profilebox sidebar={true} />

      <div className={styles.sections}>
        <div className={styles.section1}>
          <ul>
            <li className={styles.listdiv}>
              <div className={styles.listsection1}>
                <span>
                  <img src={a1} alt="img" />
                </span>
                <span>Orders & Payments</span>
              </div>
            </li>
            <li className={styles.listdiv}>
              <div className={styles.listsection1}>
                <span>
                  <img src={a2} alt="img" />
                </span>
                <div>
                  <span>My Articles & News</span>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "grey",
                      marginTop: "0.2rem",
                    }}
                  >
                    posted by you
                  </p>
                </div>
              </div>
            </li>
            <li className={styles.listdiv}>
              <div className={styles.listsection1}>
                <span>
                  <img src={a3} alt="img" />
                </span>
                <span>Saved Properties</span>
              </div>
            </li>
            <li onClick={() => toggleDropdown(1)} className={styles.listdiv}>
              <span>
                <div className={styles.listsection1}>
                  <span>
                    <img src={a4} alt="img" />
                  </span>
                  <span>My Activity</span>
                </div>
              </span>
              <span>
                <img src={down_arrow} alt="down_arrow" />
              </span>
            </li>
            {openDropdown === 1 ? <SearchBardrop list={list} /> : null}
          </ul>
        </div>
        <hr />
        <div className={styles.section2}>
          <ul>
            {list1.map((obj, index) => {
              return (
                <li
                  key={obj.id}
                  className={styles.listdiv}
                  onClick={(e) => handlesideopen(index)}
                >
                  <span>
                    <div className={styles.listsection1}>
                      <span>
                        <img src={obj.img} alt="img" />
                      </span>
                      <span>{obj.name}</span>
                    </div>
                  </span>
                  <span>
                    <img src={right_arrow} alt="down_arrow" />
                  </span>
                  {issideopen[index] ? (
                    <Sidebar2
                      heading={obj.name}
                      handlesideclose={(e) => handlesideclose(e, index)}
                      list={
                        index === 0
                          ? list2
                          : index === 1
                          ? list3
                          : index === 2
                          ? list4
                          : index === 3
                          ? list5
                          : null
                      }
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
        <hr />
        <div className={styles.section3}>
          <ul>
            <li className={styles.listdiv}>
              <div className={styles.listsection1}>
                <span>
                  <img src={a9} alt="img" />
                </span>
                <span>Area Guides</span>
              </div>
            </li>
            <li className={styles.listdiv}>
              <div className={styles.listsection1}>
                <span>
                  <img src={a10} alt="img" />
                </span>
                <span>Property Images</span>
              </div>
            </li>
            <li className={styles.listdiv}>
              <div className={styles.listsection1}>
                <span>
                  <img src={a11} alt="img" />
                </span>
                <span>Property Videos</span>
              </div>
            </li>
            <li className={styles.listdiv}>
              <div className={styles.listsection1}>
                <span>
                  <img src={a12} alt="img" />
                </span>
                <span>Articles & News</span>
              </div>
            </li>
          </ul>
        </div>
        <hr />
        <div className={styles.section4}>
          <ul>
            <li className={styles.listdiv}>About Us</li>
            <li className={styles.listdiv}>Contact Us</li>
          </ul>
        </div>
      </div>

      <div className={styles.lastdiv}>
        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",

            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            fontWeight: "650",
            fontSize: "1rem",
          }}
        >
          <div className={styles.listsection1}>
            <span>
              <img src={star} alt="img" />
            </span>
            <span>Help Center</span>
          </div>
          <span>
            <img src={right_arrow} alt="down_arrow" />
          </span>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",

            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            fontWeight: "650",
            fontSize: "1rem",
          }}
        >
          <div className={styles.listsection1}>
            <span>
              <img src={fraud} alt="img" />
            </span>
            <span>Report Fraud</span>
          </div>
          <span>
            <img src={right_arrow} alt="down_arrow" />
          </span>
        </div>








        {userDetails?.isLoggedIn&&<div
          style={{
            backgroundColor: "#7065f0",
            padding: "1rem",

            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color:"white",
            fontWeight: "650",
            fontSize: "1rem",
          }}
          onClick={handlelogout}
        >
          Logout
        </div>}
      </div>
    </div>
  );
};

export default Sidebar1;
