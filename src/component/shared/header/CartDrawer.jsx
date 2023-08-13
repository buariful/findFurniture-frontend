import {
  Button,
  ButtonGroup,
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeleteProdFromCartMutation,
  useUpdateProdOfCartMutation,
} from "../../../features/user/userApi.js";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "../../../features/user/userSlice.js";
import { LoaderSmall } from "../../../utils/Loader.js";

const CartDrawer = ({ state, setState }) => {
  const cartItem = useSelector((state) => state.user?.data?.cartItem);
  const [deleteProdFromCart, { isLoading }] = useDeleteProdFromCartMutation();
  const [updateProdOfCart, { isLoading: updCartQuntityLoad }] =
    useUpdateProdOfCartMutation();
  const [overQuantityTxt, setOverQuantityTxt] = useState("");
  const [selectedCrtItem, setSelectedCrtItem] = useState();
  const dispatch = useDispatch();

  const updateCartProuctQuantity = (productId, quantity) => {
    const data = { productId, quantity };
    setSelectedCrtItem(productId);
    updateProdOfCart(data)
      .unwrap()
      .catch(() => {});
  };

  const deleteCartItem = (productId) => {
    setSelectedCrtItem(productId);
    deleteProdFromCart(productId)
      .unwrap()
      .then((res) => dispatch(deleteFromCart(productId)))
      .catch(() => {});
  };
  useEffect(() => {
    cartItem?.map((cart) => {
      if (cart.quantity > cart?.product?.stock) {
        setOverQuantityTxt("Please reduce quantity of products");
      } else {
        setOverQuantityTxt("");
      }
      return "";
    });
  }, [cartItem]);

  return (
    <div>
      {/* cart drawer */}
      <Drawer
        placement="right"
        open={state}
        onClose={() => setState(false)}
        className={`p-5 xs:!max-w-[350px] overflow-y-auto ${
          !state && "xs:!translate-x-[350px] duration-300"
        }`}
      >
        <div className="w-11/12 flex justify-between items-center border-b border-b-blue-gray mb-5">
          <h4 className="font-semibold text-lg">Cart Items</h4>

          <IconButton
            variant="text"
            className="text-black hover:text-blue-500"
            onClick={() => setState(false)}
          >
            <ArrowRightIcon className="w-4" strokeWidth={3} />
          </IconButton>
        </div>
        {overQuantityTxt && (
          <p className="text-red-500 bg-red-50 py-2 rounded text-sm mb-4">
            {overQuantityTxt}
          </p>
        )}
        {cartItem?.map((cart) => {
          return (
            <div
              className={`grid grid-cols-12 gap-1 pb-2 border-b border-b-blue-gray relative`}
              key={cart?.product?._id}
            >
              <div className="col-span-8 text-start break-all">
                <Link
                  to={`/product/${cart?.product?._id}`}
                  onClick={() => setState(false)}
                  className="text-sm font-semibold mb-1 capitalize hover:text-blue-600"
                >
                  {cart?.product?.name}
                </Link>
                <p
                  className={`text-sm ${
                    cart?.quantity > cart?.product?.stock &&
                    "bg-red-50 py-1 px-2"
                  }`}
                >
                  Stock:{" "}
                  <span
                    className={`font-semibold inline-block px-3 rounded-full ${
                      cart?.product?.stock < cart?.quantity
                        ? "text-red-500 bg-red-50"
                        : "text-green-500 bg-green-50"
                    }`}
                  >
                    {cart?.product?.stock}
                  </span>
                </p>
                <p className="text-sm ">
                  Code:{" "}
                  <span className="font-semibold">
                    {cart?.product?.productCode}
                  </span>
                </p>
                <p className=" text-blue-500 font-semibold">
                  Tk{" "}
                  {cart?.product?.sellPrice
                    ? cart?.product?.sellPrice
                    : cart?.product?.price}
                </p>
                <div
                  className={`${
                    cart?.quantity > cart?.product?.stock &&
                    "bg-red-50 py-1 px-2"
                  }`}
                >
                  <ButtonGroup size="sm">
                    <Button
                      className="text-sm font-normal px-3 py-1"
                      disabled={cart?.quantity === 1}
                      onClick={() =>
                        updateCartProuctQuantity(
                          cart?.product?._id,
                          cart?.quantity - 1
                        )
                      }
                    >
                      -
                    </Button>
                    <Button
                      className="text-[11px] font-normal px-3 py-1 text-black bg-white border cursor-default"
                      variant="text"
                    >
                      {cart?.quantity}
                    </Button>
                    <Button
                      className="text-sm font-normal px-3 py-1"
                      disabled={cart?.quantity >= cart?.product?.stock}
                      onClick={() =>
                        updateCartProuctQuantity(
                          cart?.product?._id,
                          cart?.quantity + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-1">
                  <img
                    src={cart?.product?.images[0]?.url}
                    alt=""
                    className="w-full max-w-[90px]"
                  />
                  <button
                    className="text-red-500 block"
                    onClick={() => deleteCartItem(cart?.product?._id)}
                  >
                    <TrashIcon className="w-5" />
                  </button>
                </div>
              </div>
              {(isLoading || updCartQuntityLoad) &&
                selectedCrtItem === cart?.product?._id && (
                  <div className="absolute top-0 left-0 w-[104%] h-full bg-[#efefefa1] grid place-items-center">
                    <LoaderSmall />
                  </div>
                )}
            </div>
          );
        })}
        {cartItem?.length === 0 && (
          <p className="text-red-500">No products in your cart</p>
        )}

        <Link to="/checkout" onClick={() => setState(false)}>
          <Button
            size="sm"
            className="capitalize text-sm font-normal mt-6"
            disabled={overQuantityTxt || cartItem?.length === 0}
          >
            {" "}
            Proceed To Checkout
          </Button>
        </Link>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
