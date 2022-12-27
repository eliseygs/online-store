import React, {useState, createContext} from "react";
import PropTypes from "prop-types";

import '../../styles/components/Rating.scss'
import StarRatingLabel from "./widgets/StarRatingLabel";
import StarsList from "./widgets/StarsList";

export const StarRatingContext = createContext();

export default function Rating({
  defaultState,
  rating,
  votes,
  emptyColor,
  fillColor,
  height,
  labelText,
  maxValue,
  onChangeHover,
  onChangeValue,
  readOnly,
  width,
}) {
  const [grade, setGrade] = useState(defaultState);
  const [hover, setHover] = useState(null);
  const setGradeFn = (value) => {
    if (readOnly) return;

    setGrade(value);
    onChangeValue(value);
  }

  const setHoverFn = (value) => {
    if (readOnly) return;

    setHover(value);
    onChangeHover(value);
  }

  return (
    <>
      <StarRatingContext.Provider
        value={{
          emptyColor,
          fillColor,
          height,
          hover,
          labelText,
          grade,
          rating,
          votes,
          setHover: setHoverFn,
          setGrade: setGradeFn,
          width,
          maxValue,
        }}
      >
        <>
          <StarsList />
          <StarRatingLabel />
        </>
      </StarRatingContext.Provider>
    </>
  );
}

Rating.propTypes = {
  defaultState: PropTypes.number,
  rating:PropTypes.number,
  votes:PropTypes.number,
  emptyColor: PropTypes.string,
  fillColor: PropTypes.string,
  height: PropTypes.number,
  labelText: PropTypes.func,
  maxValue: PropTypes.number,
  onChangeHover: PropTypes.func,
  onChangeValue: PropTypes.func,
  readOnly: PropTypes.bool,
  width: PropTypes.number,
};

Rating.defaultProps = {
  defaultState: 5,
  rating:0,
  votes:0,
  emptyColor: "grey",
  fillColor: "#fed900",
  height: 30,
  labelText: (grade, rating, votes) => `${grade} Rating is: ${rating} votes: ${votes}`,
  maxValue: 5,
  onChangeHover: () => {},
  onChangeValue: () => {},
  readOnly: false,
  width: 25,
};