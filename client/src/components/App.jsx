import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsWidget from './ratings/ReviewsWidget.jsx';
import TEMPPRODUCTS from './TEMPPRODUCTS.jsx';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../components/common/Navigation.jsx';
import Overview from '../components/main_component/Overview.jsx';
import QuestionsList from './Questions&Answers/QuestionsList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: { id: 0 },
      productId: '0',
      productInfo: [],
      productName: '',
    };
    this.selectProduct = this.selectProduct.bind(this);
    this.getProductData = this.getProductData.bind(this);
  }

  getProductData = () => {
    axios
      .get('/products?page=1&count=10')
      .then(({ data }) => {
        this.setState({
          productInfo: data,
          currentProduct: data[0],
          productId: data[0].id,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  componentDidMount() {
    this.getProductData();
  }

  selectProduct(id) {
    for (var i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].id === parseInt(id)) {
        this.setState({
          currentProduct: this.state.products[i],
          productId: this.state.products[i].id,
        });
      }
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1 id='header'>The Right Fit</h1>

          <Navbar />

          <Overview
            products={this.state.productInfo}
            productId={this.state.productId}
          />
          <h1>Questions And Answers</h1>
          <div className='QuestionAndAnswerBody'>
            <QuestionsList
              currentProduct={this.state.productId}
              productName={this.state.productName}
            />
          </div>
          <ReviewsWidget
            product={this.state.currentProduct}
            showMoreReviews={this.showMoreReviews}
          />
          <TEMPPRODUCTS
            products={this.state.productInfo}
            selectProduct={this.selectProduct}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
