import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "../../Atoms/Button";
import api from "../../service/apiGateway"
import { useSelector } from "react-redux";

const Section5 = ({ name,id }) => {

  const Token=useSelector((store)=>store.user.token);
  const user_id=useSelector((store)=>store.user.user_id)
  console.log("Token",Token)
  const [posted,setPosted]=useState(false);
  const [loading,setLoading]=useState(false);  
  const [error,setError]=useState(false);

  const [inquiry,setInquiry]=useState({
    fname:"",
    lname:"",
    email:"",
    phone:"",
    property:"",
    message:""
  })

  const postInquiry=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const response=await api.post(`/user/inquire/${user_id}`,{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6Ijk4NzMwNDc3MDciLCJfaWQiOiI2NmEwZDhiZTQ2ZTYyYjc3YWFmNmYyMDgiLCJmbmFtZSI6IlJhaHVsIiwibG5hbWUiOiJ4eXoiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyMjIzMTA3MywiZXhwIjoxNzIyMzE3NDczfQ.TShT2yF5pSv03_bjYyp7uFsmHJglU64Fh6smXkWlAjE`
        },
       data:{inquiry},
       
      }) 
      setPosted(true);
      
    } catch(error) {
      
setError(true);
console.log("error while posting inquiry about property",error)
    } finally{
      setLoading(false)
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInquiry((prevState) => ({
      ...prevState,
      [name === "firstName" ? "fname" : name==="lastName"?"lname":name==="email"?"email":name==="phoneNumber"?"phone":name==="selectedProperty"?"property":"message"]: value,
    }));
  };
  return (
    <div>
      <h4 style={{ fontSize: "2rem", fontWeight: "650", whiteSpace: "wrap" }}>
        {`Inquire About ${name||"Property"}`}
      </h4>
      <p
        style={{ marginTop: "0.9rem", fontWeight: "550" }}
        className={styles.desc}
      >
        Interested in this property? Fill out the form below, and our real
        estate expert will get back to you with more details, including
        scheduling a viewing and answering any questions you may have.
      </p>
      <div>
        <div
          style={{
            border: "1px solid grey",
            padding: "3rem 2rem",
            marginTop: "4rem",
            borderRadius: "10px",
          }}
        >
          <form>
            <div className={styles.formgrid}>
              <div style={{ width: "100%" }}>
                <label htmlFor="firstName" style={{ fontWeight: "550" }}>
                  First Name
                </label>
                <div className={styles.inputdiv} style={{ marginTop: "1rem" }}>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={inquiry.fname}
                    onChange={(e)=>handleChange(e)}
                    required
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <label htmlFor="lastName" style={{ fontWeight: "550" }}>
                  Last Name
                </label>
                <div className={styles.inputdiv} style={{ marginTop: "1rem" }}>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    onChange={(e)=>handleChange(e)}
                    required
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <label htmlFor="email" style={{ fontWeight: "550" }}>
                  Email
                </label>
                <div className={styles.inputdiv} style={{ marginTop: "1rem" }}>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter Email"
                    onChange={(e)=>handleChange(e)}
                    required
                  />
                </div>
              </div>
              <div style={{ width: "100%" }}>
                <label htmlFor="phoneNumber" style={{ fontWeight: "550" }}>
                  Phone
                </label>
                <div className={styles.inputdiv} style={{ marginTop: "1rem" }}>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    onChange={(e)=>handleChange(e)}
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ width: "100%", marginTop: "2rem" }}>
              <label htmlFor="selectedProperty" style={{ fontWeight: "550" }}>
                Selected Property
              </label>
              <div className={styles.inputdiv} style={{ marginTop: "1rem" }}>
                <input
                  id="selectedProperty"
                  name="selectedProperty"
                  type="text"
                  placeholder="Enter Selected Property"
                  onChange={(e)=>handleChange(e)}
                  required
                />
              </div>
            </div>

            <div style={{ width: "100%", marginTop: "2rem" }}>
              <label htmlFor="message" style={{ fontWeight: "550" }}>
                Message
              </label>
              <div
                className={styles.inputdiv}
                style={{ marginTop: "1rem", height: "12rem" }}
              >
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  placeholder="Your Message"
                  style={{
                    width: "100%",
                    height: "100%",
                    resize: "none",
                    border: "none",
                    outline: "none",
                    // borderColor: "black",
                    // row: "50",
                  }}
                  onChange={(e)=>handleChange(e)}
                  required
                />
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "2rem",
                flexWrap: "wrap",
                marginTop: "4rem",
              }}
            >
              <div
                style={{
                  // width: "70%",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  // flexWrap: "wrap",
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    style={{ cursor: "pointer" }}
                    required
                  />
                </div>
                <p style={{ fontSize: "0.8rem" }}>
                  I agree with{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Terms of use
                  </span>{" "}
                  and{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Privacy Policy
                  </span>
                </p>
              </div>

              <Button type="primary2" onClick={postInquiry}>Send Your Message</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Section5;
