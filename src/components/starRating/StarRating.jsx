import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ ratings }) => {
  // An array with 5 elements, representing 5 stars
  const stars = Array(5).fill(0);

  // Determine if there is a decimal part in the rating
  const fullStars = Math.floor(ratings);
  const halfStar = ratings % 1 !== 0;

  return (
    <div style={styles.starsContainer}>
      {stars.map((_, index) => {
        if (index < fullStars) {
          return (
            <FaStar key={index} size={15} color="#7065f0" style={styles.star} />
          );
        } else if (index === fullStars && halfStar) {
          return (
            <FaStarHalfAlt
              key={index}
              size={15}
              color="#7065f0"
              style={styles.star}
            />
          );
        } else {
          return (
            <FaRegStar
              key={index}
              size={15}
              color="#7065f0"
              style={styles.star}
            />
          );
        }
      })}
    </div>
  );
};

// Some basic styles for the stars
const styles = {
  starsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.3rem",
  },
  star: {},
};

export default Rating;
