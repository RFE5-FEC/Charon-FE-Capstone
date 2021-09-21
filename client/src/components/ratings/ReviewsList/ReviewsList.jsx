import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';

const ReviewsList = (props) => {
  // let shownReviews = props.reviews.slice(0, props.count);
  // let sortedReviews = shownReviews.sort(props.sortFunction);
  return (
    <StyledReviews name='Reviews List'>
      {props.reviews.map((review) => {
        return (
          <ReviewTile
            review={review}
            key={review.review_id}
            helpful={props.helpful}
            report={props.report}
          />
        );
      })}
    </StyledReviews>
  );
};

const StyledReviews = styled.ul`
  width: 100%;
  padding-inline-start: 0;

  max-height: 600px;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  .noBullet {
    list-style-type: none;
  }
`;

export default ReviewsList;
