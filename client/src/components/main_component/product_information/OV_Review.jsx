import React from "react";
import Select from "react-select";
import Stars from "./Stars.jsx";

const Review = (props) => {
  let reviewData = props.reviewdata;
  let count = props.count;
  if (count > 0) {
    let numReviews = 0;
    let ratings = [];
    for (var i = 0; i < reviewData.length; i++) {
      ratings.push(reviewData[i].rating);
      numReviews++;
    }
    let averageRating = props.averageFunc(ratings);
    if (numReviews > 0) {
      return (
        <div className="reviewmain">
          {" "}
          <Stars rating={averageRating} title={averageRating + " stars"} />
          <a data={reviewData} id="readreviews" title="Read all reviews">
            {" "}
            &#65372; Read {numReviews} review(s)
          </a>
        </div>
      );
    } else {
      return <div data={reviewData}></div>;
    }
  } else {
    return (
      <div>
        <br />
      </div>
    );
  }
};

export default Review;
