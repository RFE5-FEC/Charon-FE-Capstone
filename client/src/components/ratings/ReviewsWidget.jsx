import React from 'react';
import ReviewsList from './ReviewsList/ReviewsList.jsx';
import RatingsBreakdown from './RatingsBreakdown/RatingsBreakdown.jsx';
import SortOptions from './SortOptions/SortOptions.jsx';
import AddReview from './AddReview/AddReview.jsx';
import Factors from './Factors/Factors.jsx';
import MoreReviewsButton from './MoreReviewsButton.jsx';
import axios from 'axios';
import styled from 'styled-components';

class ReviewsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      showCount: 2,
      sortOption: 'Relevant',
      filter: [],
      recommended: {},
      ratings: {},
      characteristics: {},
    };
    this.helpful = this.helpful.bind(this);
    this.report = this.report.bind(this);
    this.filterBy = this.filterBy.bind(this);
    this.removeAllFilters = this.removeAllFilters.bind(this);
    this.sort = this.sort.bind(this);
    this.submit = this.submit.bind(this);
    this.showMoreReviews = this.showMoreReviews.bind(this);
    this.getData = this.getData.bind(this);
    this.getMetaData = this.getMetaData.bind(this);
    this.sortReviews = this.sortReviews.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
  }

  static sortFunctions = {
    Relevant: (a, b) => {},
    Helpful: (a, b) => b.helpfulness - a.helpfulness,
    Newest: (a, b) => new Date(b.date) - new Date(a.date),
  };

  showMoreReviews() {
    let newCount = this.state.showCount + 2;
    this.setState({ showCount: newCount });
  }

  sort(option) {
    this.setState({ sortOption: option });
  }

  helpful(reviewId) {
    axios
      .put(`/reviews/${reviewId}/helpful`)
      .then((res) => {
        this.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  report(reviewId) {
    axios
      .put(`/reviews/${reviewId}/report`)
      .then((res) => {
        this.getData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submit(data) {
    console.log('Submitted', data);
    axios({
      method: 'post',
      url: '/reviews',
      data: data,
    }).catch((err) => {
      console.error(err);
    });
  }

  filterBy(starRating) {
    let filter = this.state.filter.slice();
    if (filter.includes(starRating)) {
      filter.splice(filter.indexOf(starRating), 1);
    } else {
      filter.push(starRating);
    }
    filter.sort();
    this.setState({ filter: filter });
  }

  removeAllFilters() {
    this.setState({ filter: [] });
  }

  recommendedPercentages() {
    let yes = parseInt(this.state.recommended.true);
    let no = parseInt(this.state.recommended.false);
    let totalRecommendations = yes + no;
    let yesPercent = Math.round((yes / totalRecommendations) * 1000) / 10;
    let noPercent = Math.round((no / totalRecommendations) * 1000) / 10;
    return yesPercent;
  }

  getData() {
    axios
      .get(`/reviews?product_id=${this.props.product.id || 37311}&count=100`)
      .then((res) => {
        this.setState({ allReviews: res.data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getMetaData() {
    axios
      .get(`/reviews/meta?product_id=${this.props.product.id || 37311}`)
      .then((res) => {
        this.setState({
          recommended: res.data.recommended,
          ratings: res.data.ratings,
          characteristics: res.data.characteristics,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sortReviews(reviews) {
    return reviews.sort(ReviewsWidget.sortFunctions[this.state.sortOption]);
  }

  filterReviews(reviews) {
    return reviews.filter(
      (review) =>
        this.state.filter.includes(review.rating.toString()) ||
        this.state.filter.length === 0
    );
  }

  render() {
    let modifiedReviews = this.filterReviews(
      this.sortReviews(this.state.allReviews)
    );
    let shownReviews = modifiedReviews.slice(0, this.state.showCount);

    return (
      <StyledWidget className='row' name='Reviews Widget'>
        <div className='column'>
          <RatingsBreakdown
            id='breakdown'
            name='Breakdown'
            ratings={this.state.ratings}
            filterBy={this.filterBy}
            filter={this.state.filter}
            removeAllFilters={this.removeAllFilters}
            recommended={this.recommendedPercentages()}
          />
          <Factors
            name='Factors'
            characteristics={this.state.characteristics}
          />
        </div>
        <div id='column' className='column'>
          <SortOptions name='Sort Options' sort={this.sort} />
          <ReviewsList
            name='Reviews List'
            reviews={shownReviews}
            count={this.state.showCount}
            helpful={this.helpful}
            report={this.report}
            filter={this.state.filter}
            sortFunction={ReviewsWidget.sortFunctions[this.state.sortOption]}
          />
          <div className='row'>
            <MoreReviewsButton
              showMore={this.showMoreReviews}
              showCount={this.state.showCount}
              reviews={modifiedReviews}
            />
            <AddReview
              name='Add Review'
              product={this.props.product}
              characteristics={this.state.characteristics}
              submit={this.submit}
            />
          </div>
        </div>
      </StyledWidget>
    );
  }

  componentDidMount() {
    this.getData();
    this.getMetaData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.getData();
      this.getMetaData();
    }
  }
}

const StyledWidget = styled.div`
  margin: 10px;
  padding: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;

  .column {
    display: flex;
    flex-direction: column;
    width: 30%;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .link {
    color: dimgrey;
    cursor: pointer;
  }
  .link:hover {
    color: rgb(34, 34, 34);
  }
  .large {
    font-size: 150%;
  }
  #breakdown {
    width: 30%;
  }
  #column {
    width: 50%;
  }
  button {
    cursor: pointer;
    background-color: rgb(34, 34, 34);
    border: none;
    color: #faf9f8;
    border-radius: 3.5px;
    width: 100%;
    height: 25px;
    margin: 5px 0;
  }
`;

export default ReviewsWidget;
