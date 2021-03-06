import React from 'react';

const Recommendations = (props) => {
  let recommended = null;
  if (!Number.isNaN(props.recommended)) {
    recommended = props.recommended;
  }
  return (
    <React.Fragment>
      <div>{recommended}% of reviews recommend this product</div>
    </React.Fragment>
  );
};

export default Recommendations;
