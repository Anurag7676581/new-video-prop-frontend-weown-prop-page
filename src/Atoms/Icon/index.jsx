import React from "react";

const Icon = ({ name, fill = "#000", width = "24px", height = "24px" }) => {
  //   const url = `/${url}`; // enter the blob storage path

  return (
    <div style={{ width, height }}>
      <img
        src={"http://localhost:3000/logo192.png"}
        alt="Icon"
        style={{ width: "100%", height: "100%", fill }}
      />
    </div>
  );
};

export default Icon;
