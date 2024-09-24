import React, { useState } from 'react';
import '../css/StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="starrating-star-rating" style={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <button
            type="button"
            key={index}
            className={currentRating <= (hover || rating) ? "starrating-on" : "starrating-off"}
            onClick={() => onRatingChange(currentRating)}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'pointer', border: 'none', backgroundColor: 'transparent' }}
          >
            <span className="starrating-star">&#9733;</span>
          </button>
        );
      })}
      <span style={{ marginLeft: '10px', fontSize: '20px' }}>{rating}</span>
    </div>
  );
};

export default StarRating;
