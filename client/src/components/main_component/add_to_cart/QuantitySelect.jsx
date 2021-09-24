import React from "react";
import Select from "react-select";

const QuantitySelector = (props) => {
  const options = [];
  let qty;
  let i = 1;
  for (let key in props.styleSkus) {
    if (props.selectedSizeOption === props.styleSkus[key].size) {
      qty = props.styleSkus[key].quantity;
    }
  }
  if (qty > 15) {
    qty = 15;
  }
  while (qty >= i) {
    options.push({
      value: i,
      label: i,
    });
    i += 1;
  }

  return (
    <div className="quantityselectormain">
      <div id="selectquantity">
        <Select
          placeholder="Quantity"
          options={options}
          onChange={props.handleQtyChange}
          id="qtyselect"
        />
      </div>
    </div>
  );
};

export default QuantitySelector;
