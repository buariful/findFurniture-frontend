import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";
import {
  useAddProdToCartMutation,
  useAddProdToWishlistMutation,
  useDeleteProdFromWishlistMutation,
} from "../../features/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWislist,
  deleteFromWishlist,
} from "../../features/user/userSlice";
import { ToastError, ToastSuccess } from "../../utils/Toast";
import { useState } from "react";
import ReactStars from "react-stars";

const ProdAllProducts = ({ data }) => {
  const [addProdToCart, { isLoading }] = useAddProdToCartMutation();
  const [addProdToWishlist] = useAddProdToWishlistMutation();
  const [deleteProdFromWishlist] = useDeleteProdFromWishlistMutation();
  const [btnClicked, setBtnClicked] = useState(null);
  const { cartItem, wishList } = useSelector((state) => state?.user?.data);
  const dispatch = useDispatch();
  const handleAddCart = (prod) => {
    setBtnClicked(prod?._id);
    addProdToCart({ productId: prod?._id })
      .unwrap()
      .then((res) => {
        dispatch(
          addToCart({
            ...res?.data,
            product: {
              _id: prod?._id,
              name: prod?.name,
              productCode: prod?.productCode,
              images: prod?.images,
              price: prod?.price,
              sellPrice: prod?.sellPrice,
              stock: prod?.stock,
              shippingCost: prod?.shippingCost,
            },
          })
        );
        ToastSuccess(res?.message);
      })
      .catch((err) => ToastError(err?.data?.message));
  };
  const handleWishlist = (prod, isAdding) => {
    if (isAdding) {
      addProdToWishlist(prod?._id)
        .unwrap()
        .then((res) => {
          dispatch(
            addToWislist({
              ...res?.data,
              _id: prod?._id,
              name: prod?.name,
              productCode: prod?.productCode,
              images: prod?.images,
              price: prod?.price,
              sellPrice: prod?.sellPrice,
              stock: prod?.stock,
            })
          );
        })
        .catch((err) => {
          ToastError(err?.data?.message);
        });
    } else {
      deleteProdFromWishlist(prod?._id)
        .unwrap()
        .then(() => dispatch(deleteFromWishlist(prod?._id)))
        .catch(() => {});
    }
  };

  const products = data.map((d) => {
    const product = cartItem?.find((cart) => cart?.product?._id === d?._id);
    const isWishlisted = wishList?.find((prod) => prod?._id === d?._id);
    return (
      <Card
        className="border border-[#eee] shadow-none hover:shadow-md hover:border-gray-300 duration-300"
        key={d?._id}
      >
        <CardHeader shadow={false} floated={false} className="m-2">
          <Link to={`/product/${d?._id}`}>
            {" "}
            <img
              src={d?.images[0]?.url}
              className="w-full object-cover h-[190px] max-h-[190px]"
              alt=""
            />
          </Link>
        </CardHeader>
        <CardBody className="pb-4 pt-1 px-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to={`/product/${d?._id}`}
              className="font-medium text-gray-700 capitalize hover:text-blue-500 duration-300"
            >
              {d?.name}
            </Link>
            {isWishlisted ? (
              <HeartIconFill
                className="w-5 text-red-600 cursor-pointer"
                onClick={() => handleWishlist(d, false)}
              />
            ) : (
              <HeartIcon
                className="w-5 text-black cursor-pointer"
                onClick={() => handleWishlist(d, true)}
              />
            )}
          </div>

          <div className="text-start">
            <ReactStars
              count={5}
              size={19}
              value={d?.avg_rating}
              color2={"#FF9933"}
              half={true}
              edit={false}
            />

            <h3 className="font-semibold text-blue-400 text-lg">
              Tk {d?.price}
            </h3>
          </div>

          <Button
            size="sm"
            className="mt-2 text-[10px] px-4 py-2"
            onClick={() => handleAddCart(d)}
            variant={product ? "outlined" : "gradient"}
            disabled={(isLoading && d?._id === btnClicked) || product}
          >
            {isLoading && d?._id === btnClicked ? (
              <Spinner color="white" className="h-4 w-4" />
            ) : product ? (
              "Selected"
            ) : (
              "Add to cart"
            )}
          </Button>
        </CardBody>
      </Card>
    );
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
      {products}
    </div>
  );
};

export default ProdAllProducts;
