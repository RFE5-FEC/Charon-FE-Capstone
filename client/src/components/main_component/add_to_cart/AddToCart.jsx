import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const AddToCart = (props) => {
  return (
    <div className="addtocartmain">
      <div id="cartadd">
        <button
          type="submit"
          className="cartbtn"
          title="Add to Cart"
          onClick={(e) => props.postCart(e)}
        >
          <FontAwesomeIcon icon={faShoppingBag} id="shoppingbag" /> Add To Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
