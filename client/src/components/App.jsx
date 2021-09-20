import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/common/Navigation.jsx";
import Overview from "../components/main_component/Overview.jsx";
import QuestionsList from "./Questions&Answers/QuestionsList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "0",
      productInfo: [],
      productName: "",
    };
    this.getProductData = this.getProductData.bind(this);
  }

  componentDidMount() {
    this.getProductData();
  }

  getProductData = () => {
    axios
      .get("/products")
      .then((productData) => {
        this.setState({
          productInfo: productData.data,
          productId: productData.data[0].id,
          productName: productData.data[0].name,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1 id="header">The Right Fit</h1>

          <Navbar />

          <Overview
            products={this.state.productInfo}
            productId={this.state.productId}
          />
          <h1>Questions And Answers</h1>
          <div className="QuestionAndAnswerBody">
            <QuestionsList
              currentProduct={this.state.productId}
              productName={this.state.productName}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
