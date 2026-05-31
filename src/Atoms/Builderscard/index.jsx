import React from "react";

const Builderscard = ({
  imgUrl,
  label,
  description,
  chips = [],
  price,
  buttonLabel,
}) => {
  return (
    <div>
      <img src={imgUrl} />
    </div>
  );
};

export default Builderscard;
