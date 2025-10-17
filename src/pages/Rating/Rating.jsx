import React from "react";
import classes from './rating.module.css'

const Rating = ({ value }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < value ? "star filled" : "star"}>
      &#9733;
    </span>
  ));

  return <div className={classes.rating}>{stars}</div>;
};

export default Rating;
