import React from 'react';
import axios from 'axios';

import Navbar from '../components/common/Navigation.jsx';
import Overview from '../components/main_component/Overview.jsx';
import ProductList from '../components/RelatedProducts/ProductList';
import QuestionsList from '../components/Questions&Answers/QuestionsList.jsx';
import ReviewsWidget from '../components/ratings/ReviewsWidget.jsx';
import TEMPPRODUCTS from './TEMPPRODUCTS.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: [],
      currentProduct: { id: 0 },
      productId: '0',
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
          productName: data[0].name,
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
    for (var i = 0; i < this.state.productInfo.length; i++) {
      if (this.state.productInfo[i].id === parseInt(id)) {
        this.setState({
          currentProduct: this.state.productInfo[i],
          productId: this.state.productInfo[i].id,
          productName: this.state.productInfo[i].name,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <h1 id='header'>The Right Fit</h1>
        <Navbar />
        <Overview
          products={this.state.productInfo}
          productId={this.state.productId}
        />
        <ProductList />
        <h1 id='QandAheader'>Questions And Answers</h1>
        <div className='QuestionAndAnswerBody'>
          <QuestionsList
            currentProduct={this.state.productId}
            productName={this.state.productName}
          />
        </div>
        <ReviewsWidget product={this.state.currentProduct} />
        {/* <TEMPPRODUCTS
          selectProduct={this.selectProduct}
          products={this.state.productInfo}
        /> */}
      </div>
    );
  }
}

export default App;
