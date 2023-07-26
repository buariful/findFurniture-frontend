import React, { useState } from "react";
import ReactSelect from "react-select";

const Cart = () => {
  const [shipCost, setShipCost] = useState(0);

  const cartItem = [
    {
      product: {
        shippingCost: {
          freeShipping: { area: ["4", "5", "6"], time: 1 },
          lowShipping: { area: ["10", "12", "13", "1"], time: 2, price: 10 },
          highShipping: { time: 4, price: 20 },
        },
      },
      quantity: 40,
    },
    {
      product: {
        shippingCost: {
          freeShipping: { area: ["2", "5", "4"], time: 2 },
          lowShipping: {
            area: ["10", "9", "15", "12", "13", "1"],
            time: 2,
            price: 10,
          },
          highShipping: { time: 4, price: 20 },
        },
      },
      quantity: 90,
    },
    {
      product: {
        shippingCost: {
          freeShipping: { area: ["4", "5", "6", "22", "25"], time: 3 },
          lowShipping: {
            area: ["10", "12", "13", "65", "87", "1"],
            time: 4,
            price: 10,
          },
          highShipping: { time: 4, price: 20 },
        },
      },
      quantity: 40,
    },
  ];

  const handleChange = async (inputValue) => {
    let matchedShippingCost = 0;

    // Iterate through each cart item to find the matching shipping cost
    cartItem.forEach((item) => {
      const { freeShipping, lowShipping, highShipping } =
        item.product.shippingCost;

      if (freeShipping.area.includes(inputValue)) {
        matchedShippingCost += 0;
      } else if (lowShipping.area.includes(inputValue)) {
        matchedShippingCost += lowShipping.price;
      } else {
        matchedShippingCost += highShipping.price;
      }
    });

    setShipCost(matchedShippingCost);
  };

  return (
    <div>
      <p className="bg-red-500 p-5 m-5 text-white">{shipCost}</p>
      <div className="w-[300px] mx-auto">
        <ReactSelect
          label="Select Colors"
          id="relted_category"
          closeMenuOnSelect={false}
          onChange={(e) => {
            handleChange(e.value);
          }}
          isMulti={false}
          options={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "9", value: "9" },
            { label: "10", value: "10" },
            { label: "12", value: "12" },
            { label: "13", value: "13" },
            { label: "15", value: "15" },
            { label: "22", value: "22" },
            { label: "25", value: "25" },
            { label: "67", value: "67" },
            { label: "87", value: "87" },
          ]}
        />
      </div>
    </div>
  );
};

export default Cart;
