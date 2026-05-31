import React from "react";
import wishlist_btn from "./wishlist_btn.png";

const PropertyCard = ({
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

export default PropertyCard;
