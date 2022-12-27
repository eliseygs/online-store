import React, { useContext } from "react";

import { StarRatingContext } from "../Rating";

function StarRatingLabel() {
  const { grade, rating, votes, labelText } = useContext(StarRatingContext);

  return (
    <div>{labelText(grade,rating, votes)}</div>
  );
}

export default StarRatingLabel;