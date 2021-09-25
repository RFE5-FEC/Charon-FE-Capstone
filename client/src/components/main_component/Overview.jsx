import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import ProductInfo from "./product_information/ProductInfo.jsx";
import Review from "./product_information/OV_Review.jsx";
import FreeForm from "./product_information/FreeForm.jsx";
import BrandLogos from "./product_information/BrandLogos.jsx";

import StyleSelector from "./style_selector/StyleSelector.jsx";

import MainImage from "./image_gallery/MainImage.jsx";
import Gallery from "./image_gallery/GalleryView.jsx";
import ImgModal from "./image_gallery/ImgModal.jsx";

import SizeSelector from "./add_to_cart/SizeSelect.jsx";
import QuantitySelector from "./add_to_cart/QuantitySelect.jsx";
import AddToCart from "./add_to_cart/AddToCart.jsx";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      allStyles: [],
      currentStyle: {},
      productReview: [],
      average: 0,
      idx: 0,
      height: 0,
      width: 0,
      count: 0,
      page: 0,
      favorite: false,
      toggleZoom: false,
      styleSkus: {},
      selectedSizeOption: null,
      selectedQtyOption: null,
      modal: false,
    };

    this.getStyleData = this.getStyleData.bind(this);
    this.getReviewData = this.getReviewData.bind(this);
    this.getAverage = this.getAverage.bind(this);
    this.styleOnClick = this.styleOnClick.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.downArrowOnClick = this.downArrowOnClick.bind(this);
    this.upArrowOnClick = this.upArrowOnClick.bind(this);
    this.leftArrowOnClick = this.leftArrowOnClick.bind(this);
    this.rightArrowOnClick = this.rightArrowOnClick.bind(this);
    this.showModalClick = this.showModalClick.bind(this);
    this.thumbnailOnClick = this.thumbnailOnClick.bind(this);
    this.closeModalClick = this.closeModalClick.bind(this);
    this.addToCartPost = this.addToCartPost.bind(this);
    this.modalGalleryClick = this.modalGalleryClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.getStyleData(this.props.productId);
      this.getReviewData(this.props.productId);
    }
  }

  addToCartPost = (e) => {
    var skuId;
    var skuPost;
    // create object with current sz/qty state
    var shoppingData = {
      size: this.state.selectedSizeOption,
      quantity: this.state.selectedQtyOption,
    };
    // iterate through all skus
    for (var key in this.state.styleSkus) {
      // compare to find corresponding sku to POST
      if (this.state.styleSkus[key].size === shoppingData.size) {
        skuPost = {
          sku_id: key,
        };
      }
    }
    axios
      .post("/cart", skuPost)
      .then((cartData) => {
        // console.log("SUCCESS", cartData);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  getStyleData = (id) => {
    // use current product id to pull it's styles to client, use data to update state
    axios
      .get(`/products/${id}/styles`)
      .then((styleData) => {
        this.setState({
          styles: styleData.data,
          allStyles: styleData.data.results,
        });
        // iterate to find the default style and use respective data to update state
        for (var i = 0; i < this.state.styles.results.length; i++) {
          if (this.state.styles.results[i]["default?"] === true) {
            this.setState({
              currentStyle: this.state.styles.results[i],
              styleSkus: this.state.styles.results[i].skus,
            });
          }
        }
        // make default style "checked" upon load
        var defaultCheck = document.querySelector("#radio0");
        defaultCheck.style.visibility = "visible";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // pulls review data from current product && set sets state
  getReviewData = (id) => {
    axios
      .get(`/reviews?product_id=${id || 37311}&count=100`)
      .then((reviewData) => {
        this.setState({
          productReview: reviewData.data.results,
          count: reviewData.data.count,
          page: reviewData.data.page,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  showModalClick = (e) => {
    this.setState({
      modal: true,
    });
  };

  closeModalClick = (e) => {
    if (this.state.modal === true) {
      this.setState({
        modal: false,
      });
    }
  };


  // repeated logic of this.thumbnailOnClick *TEMP FIX* (prevents call stack overflow)
  modalGalleryClick = (index, e) => {
    // prevent furthering of bubbling && capturing
    e.stopPropagation();
    var recurse = (target) => {
      // assignments for ul, li, and li > div
      var ul = document.querySelector(".modalgalthumbs");
      var children = document.querySelectorAll(".modalthumbnails");
      var modalCaro = document.querySelectorAll("#modalthumbcaro");
      // assignment for first Id
      var currentId = modalCaro[0].lastChild.id;
      // base case - if event target id matches first Id
      if (target === currentId) {
        return;
      }
      // otherwise - recursive case
      if (target !== currentId) {
        // slice first element of node list
        var el = Array.prototype.slice.call(children, 0, 1);
        // add to end of the list
        ul.appendChild(el.shift());
        // parse index from dynamically generated img id && update state
        var idxState = Number(target.split("img")[1]);
        this.setState({
          idx: idxState,
        });
      }
      recurse(target);
    };
    // inner func invocation
    recurse(e.target.id);
  };

   styleOnClick = (selection, index, e) => {
    e.preventDefault();
    // update style based on event target
    this.setState({
      selected: Number(e.target.id),
    });
  };

  // original click event for thumbnails - logic duplicated in this.modalGalleryClick
  thumbnailOnClick = (index, e) => {
    e.preventDefault()
    var recurse = (target) => {
      var ul = document.querySelector(".galthumbs");
      var children = document.querySelectorAll(".thumbnails");
      var caroDiv = document.querySelectorAll("#thumbcaro");
      var currentId = caroDiv[0].lastChild.id;
      if (target === currentId) {
        return;
      }
      if (target !== currentId) {
        var el = Array.prototype.slice.call(children, 0, 1);
        ul.appendChild(el.shift());
        var indexState = Number(target.split("img")[1]);
        this.setState({
          idx: indexState,
        });
      }
      recurse(target);
    };
    recurse(e.target.id);
  };

  // updates index of current photo using ticker algorithm
  upArrowOnClick = (e) => {
    var children = document.querySelectorAll(".thumbnails");
    var lastEl = Array.prototype.slice.call(children, 0, children.length - 1);
    var ul = document.querySelector(".galthumbs");
    // original logic to add to end of list - TO-DO: refactor
    while (lastEl.length > 0) {
      ul.appendChild(lastEl.shift());
    }
    // index state tracker, updates MainImage && ImgModal -- cycles through array
    let idx = this.state.idx;
    if (idx == 0) {
      idx = this.state.currentStyle.photos.length - 1;
    } else {
      idx--;
    }
    this.setState({
      idx,
    });
  };

  // reverse logic of this.upArrowOnClick
  downArrowOnClick = (e) => {
    var children = document.querySelectorAll(".thumbnails");
    var firstEl = Array.prototype.slice.call(children, 0, 1);
    var ul = document.querySelector(".galthumbs");
    while (firstEl.length > 0) {
      ul.appendChild(firstEl.shift());
    }
    let idx = this.state.idx;
    if (idx == this.state.currentStyle.photos.length - 1) {
      idx = 0;
    } else {
      idx++;
    }
    this.setState({
      idx,
    });
  };

  // right and left click events - stopProp to prevent closing modal when open
  rightArrowOnClick = (e) => {
    e.stopPropagation();
    this.downArrowOnClick();
  };

  leftArrowOnClick = (e) => {
    e.stopPropagation();
    this.upArrowOnClick();
  };

  getAverage = (array) => {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  };

  // update state of size and quantity
  handleSizeChange = (selectedSz) => {
    this.setState({ selectedSizeOption: selectedSz.value });
    console.log(`Size option selected:`, selectedSz);
  };

  handleQtyChange = (selectedQty) => {
    this.setState({ selectedQtyOption: selectedQty.value });
    console.log(`Quantity option selected:`, selectedQty);
  };

  render() {
    return (
      <div className="overviewmain" onClick={(e) => this.closeModalClick(e)}>
        <MainImage
          currentStyle={this.state.currentStyle}
          zoom={this.state.toggleZoom}
          leftClick={this.leftArrowOnClick}
          rightClick={this.rightArrowOnClick}
          toggleModal={this.showModalClick}
          idxTicker={this.state.idx}
          height={this.state.height}
          width={this.state.width}
        />
        <ImgModal
          currentStyle={this.state.currentStyle}
          upClick={this.upArrowOnClick}
          downClick={this.downArrowOnClick}
          galleryClick={this.modalGalleryClick}
          modalState={this.state.modal}
          idxTicker={this.state.idx}
        />
        <Gallery
          currentStyle={this.state.currentStyle}
          upClick={this.upArrowOnClick}
          downClick={this.downArrowOnClick}
          thumbnailClick={this.thumbnailOnClick}
        />
        <ProductInfo
          products={this.props.products}
          productId={this.props.productId}
          currentStyle={this.state.currentStyle}
        />
        <Review
          reviewdata={this.state.productReview}
          averageFunc={this.getAverage}
          average={this.state.average}
          count={this.state.count}
        />
        <StyleSelector
          styles={this.state.styles}
          currentStyle={this.state.currentStyle}
          styleClick={this.styleOnClick}
          zoom={this.state.toggleZoom}
          zoomClick={this.zoomOnClick}
          rightClick={this.rightArrowOnClick}
        />
        <SizeSelector
          styleSkus={this.state.styleSkus}
          handleSizeChange={this.handleSizeChange}
          selectedSizeOption={this.state.selectedSizeOption}
        />
        <QuantitySelector
          styleSkus={this.state.styleSkus}
          handleQtyChange={this.handleQtyChange}
          selectedSizeOption={this.state.selectedSizeOption}
          selectedQtyOption={this.state.selectedQtyOption}
        />

        <AddToCart postCart={this.addToCartPost} />
        <FreeForm
          products={this.props.products}
          productId={this.props.productId}
        />
        <BrandLogos />
      </div>
    );
  }
}

export default Overview;

