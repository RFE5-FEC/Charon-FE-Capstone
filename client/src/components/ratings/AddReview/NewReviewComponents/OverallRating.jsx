import React from 'react';
import styled from 'styled-components';

const StyledRadio = styled.div`
  cursor: pointer;
  input[type='radio'],
  input[type='radio']:after,
  input[type='radio']:checked:after {
    margin: 0;
    position: revert;
    appearance: revert;
    box-sizing: revert;
    font-size: revert;
    content: '★';
    border: revert;
    font-size: 20px;
    color: revert;
    font-size: revert;
    display: revert;
  }
`;

const OverallRating = (props) => {
  let meanings = ['Poor', 'Fair', 'Average', 'Good', 'Great'];
  let meaning = null;
  meaning = <span>{meanings[parseInt(props.selected) - 1]}</span>;

  return (
    <StyledRadio onChange={props.handleChange}>
      <label>
        Overall Rating
        <input type='radio' value='1' name='rating' />
        <input type='radio' value='2' name='rating' />
        <input type='radio' value='3' name='rating' />
        <input type='radio' value='4' name='rating' />
        <input type='radio' value='5' name='rating' /> {meaning}
      </label>
    </StyledRadio>
  );
};

export default OverallRating;
