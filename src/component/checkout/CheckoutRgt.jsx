import { Button, Spinner } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { usePlaceOrderMutation } from "../../features/order/orderApi";

const CheckoutRgt = ({ props }) => {
  const cartItem = useSelector((state) => state.user?.data?.cartItem);
  const { personalInfo, address, shippingInfo } = props;
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const handleOrder = () => {
    const products = cartItem.map((item) => item?.product?._id);
    const data = {
      products,
      shipping_time: shippingInfo?.time,
      shipping_cost: shippingInfo?.cost,
      address: `${address?.division?.name}, ${address?.district?.name}, ${
        address?.upazila?.name
      }${address?.area && ","} ${address?.area && address?.area}`,
      personalInfo,
    };
    placeOrder(data)
      .unwrap()
      .then((res) => window.location.replace(res.url))
      .catch((err) => {});
  };

  let totalPrice;
  let productPrices;
  if (cartItem?.length > 0) {
    let price = 0;
    cartItem?.map((item) => {
      return (price += item?.product?.sellPrice
        ? item?.product?.sellPrice * item?.quantity
        : item?.product?.price * item?.quantity);
    });
    totalPrice = price;

    productPrices = cartItem?.map((item) => {
      return (
        <div className=" flex justify-between mb-2" key={item?._id}>
          <h4 className="capitalize">{item?.product?.name} :</h4>
          <h4 className="font-semibold ">
            Tk{" "}
            {item?.product?.sellPrice
              ? item?.product?.sellPrice * item?.quantity
              : item?.product?.price * item?.quantity}
          </h4>
        </div>
      );
    });
  }

  return (
    <div className="shadow px-5 py-10 rounded-lg bg-[#e4ebf5c9] mt-6 md:mt-20 mb-16">
      <h2 className="text-xl font-semibold my-3 inline-block">Your Order</h2>
      <div className="py-2 border-b border-b-gray-300">
        {productPrices}
        <div className="flex justify-between">
          <h4 className="">Total shipping cost:</h4>
          {shippingInfo?.cost >= 0 ? (
            <h4 className="font-semibold ">Tk {shippingInfo?.cost}</h4>
          ) : (
            <span className="text-sm text-gray-500">Select your address</span>
          )}
        </div>
      </div>

      <div className="py-2 border-b border-black  ">
        {" "}
        {address?.upazila && (
          <span className="text-red-400 text-sm">
            (Product will be deleverd within {shippingInfo?.time} days)
          </span>
        )}
      </div>
      <div className="py-2 flex justify-end gap-3 text-lg">
        <h4 className="font-semibold">Total cost:</h4>
        {totalPrice ? (
          <h4 className="font-bold text-blue-600 ">
            Tk {totalPrice + shippingInfo?.cost}
          </h4>
        ) : (
          "___"
        )}
      </div>
      <div className="grid place-items-center mt-6">
        <Button
          size="lg"
          type="submit"
          className="flex gap-2"
          disabled={
            !address?.upazila ||
            !personalInfo?.name ||
            !personalInfo?.email ||
            !personalInfo?.mblNumber
          }
          onClick={handleOrder}
        >
          {isLoading && <Spinner className="w-5" />}Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutRgt;
