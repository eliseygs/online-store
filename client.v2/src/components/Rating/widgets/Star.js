import React, { useContext } from "react";

import { StarRatingContext } from '../Rating';

function Star({ value }) {
  const {
    emptyColor,
    fillColor,
    height,
    hover,
    grade,
    setHover,
    setGrade,
    width,
  } = useContext(StarRatingContext);

  return (
    <div
      className="star"
      onClick={() => setGrade(value)}
      onMouseEnter={() => setHover(value)}
      onMouseLeave={() => setHover(null)}
    >
      <svg
        data-grade={value}
        fill={value <= (hover || grade) ? fillColor : emptyColor}
        height={height}
        viewBox="0 0 25 25"
        width={width}
      >
        <polygon
          strokeWidth="0"
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
        />
      </svg>
    </div>
  );
}

export default Star;