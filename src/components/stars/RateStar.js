import "./ratestar.scss";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RateStar = () => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);

  return (
    <div className="star__container">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              color={ratingValue <= (hover || rating) ? "#000" : "#e4e5e9"}
              className="star__item"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RateStar;
