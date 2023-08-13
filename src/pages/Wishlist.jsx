import React from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IconButton, Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddProdToCartMutation,
  useDeleteProdFromWishlistMutation,
} from "../features/user/userApi";
import { addToCart, deleteFromWishlist } from "../features/user/userSlice";
import { ToastError, ToastSuccess } from "../utils/Toast";
import { AlertError } from "../utils/Alert";

const Cart = () => {
  const wishlist = useSelector((state) => state.user?.data?.wishList);
  const [deleteProdFromWishlist, { isLoading }] =
    useDeleteProdFromWishlistMutation();
  const [addProdToCart, { isLoading: cartLoading }] =
    useAddProdToCartMutation();
  const dispatch = useDispatch();

  const handleWishlist = (productId) => {
    deleteProdFromWishlist(productId)
      .unwrap()
      .then(() => dispatch(deleteFromWishlist(productId)))
      .catch(() => {});
  };

  const handleAddCart = (prod) => {
    addProdToCart({ productId: prod?._id })
      .unwrap()
      .then((res) => {
        dispatch(addToCart(res?.data));
        ToastSuccess(res?.message);
      })
      .then(() => handleWishlist(prod?._id))
      .catch((err) => ToastError(err?.data?.message));
  };

  return (
    <>
      <h2 className="py-8 font-bold text-2xl my-5 capitalize bg-[#EEEEEE] flex items-center justify-center gap-2">
        wishlist <HeartIcon className="w-8 " />
      </h2>
      <div className="w-11/12 mx-auto mb-16">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            {wishlist?.length > 0 ? (
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4"></th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4 whitespace-nowrap">
                          Stock Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist?.map((item) => {
                        return (
                          <tr
                            className="border-b dark:border-neutral-500"
                            key={item?._id}
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <img
                                src={item?.images[0]?.url}
                                alt=""
                                className="min-w-[80px] w-[80px] rounded"
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 capitalize">
                              {item?.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {item?.sellPrice ? item?.sellPrice : item?.price}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.stock > 0 ? (
                                <span className="font-semibold text-green-500">
                                  {item?.stock}
                                </span>
                              ) : (
                                <span className="font-semibold text-red-500">
                                  Out Of Stock
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button
                                className="bg-blue-500 hover:bg-blue-700 duration-300 px-5 py-1 rounded-full text-sm text-white btn"
                                onClick={() => handleAddCart(item)}
                              >
                                {cartLoading ? (
                                  <Spinner className="w-5" color="white" />
                                ) : (
                                  "Add to cart"
                                )}
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <IconButton
                                className="bg-blue-gray-50 p-1 rounded-full"
                                onClick={() => handleWishlist(item?._id)}
                              >
                                {isLoading ? (
                                  <Spinner className="w-5" />
                                ) : (
                                  <TrashIcon className="w-5 text-red-500 " />
                                )}
                              </IconButton>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <AlertError text="No products in your wishlist" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
