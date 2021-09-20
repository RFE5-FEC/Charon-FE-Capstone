import React from "react";

var ProductInfo = (props) => {
  var currentCategory;
  var currentName;
  var styleOGPrice = props.currentStyle["original_price"];
  var styleSalePrice = props.currentStyle["sale_price"];
  for (var i = 0; i < props.products.length; i++) {
    if (props.products[i].id === props.productId) {
      currentCategory = props.products[i].category;
      currentName = props.products[i].name;
    }
  }
  if (styleSalePrice === null) {
    return (
      <div className="productinfomain">
        <br />
        <h4 id="curCateg">{currentCategory}</h4>
        <h1 id="curName">{currentName}</h1>
        <p id="newPrice">
          <br />
        </p>
        <p style={priceStyle} id="curPrice">
          ${styleOGPrice}
        </p>
      </div>
    );
  } else {
    var priceStyle = {
      textDecoration: "line-through",
    };
    var saleStyle = {
      color: "red",
    };
    return (
      <div className="productinfomain">
        <br />
        <h4 id="curCateg">{currentCategory}</h4>
        <h1 id="curName">{currentName}</h1>
        <p style={saleStyle} id="newPrice">
          ${styleSalePrice}
        </p>
        <p style={priceStyle} id="curPrice">
          ${styleOGPrice}
        </p>
      </div>
    );
  }
};

export default ProductInfo;
