import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AlertError } from "../../utils/Alert";
import {
  useDeleteProdFromCartMutation,
  useUpdateProdOfCartMutation,
} from "../../features/user/userApi";
import {
  deleteFromCart,
  updateCartProdQuantity,
} from "../../features/user/userSlice";

const CheckoutLft = () => {
  const cartItem = useSelector((state) => state.user?.data?.cartItem);
  const [updateProdOfCart] = useUpdateProdOfCartMutation();
  const [deleteProdFromCart] = useDeleteProdFromCartMutation();
  const dispatch = useDispatch();
  const [quantityError, setQuantityError] = useState("");

  const updateCartProuctQuantity = (productId, quantity) => {
    const data = { productId, quantity };
    updateProdOfCart(data)
      .unwrap()
      .then(() => {
        dispatch(updateCartProdQuantity(data));
      })
      .catch((err) => console.log(err));
  };

  const deleteCartItem = (productId) => {
    deleteProdFromCart(productId)
      .unwrap()
      .then((res) => dispatch(deleteFromCart(productId)))
      .catch(() => {});
  };
  useEffect(() => {
    cartItem?.map((cart) => {
      if (cart.quantity > cart?.product?.stock) {
        setQuantityError(`Please reduce the quantity of red mark products`);
      } else {
        setQuantityError("");
      }
      return "";
    });
  }, [cartItem]);
  return (
    <>
      {/* selected products */}
      <h2 className="font-semibold my-10 text-3xl border-b-2 border-b-blue-500 inline-block">
        Your Selected Products
      </h2>
      {quantityError && <AlertError text={quantityError} />}
      <div className="relative overflow-x-auto mb-16">
        <table className="w-full text-sm text-center">
          <thead className="text-xs uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="p-2 whitespace-nowrap text-sm"></th>
              <th scope="col" className="p-2 whitespace-nowrap text-sm">
                Product name
              </th>
              <th scope="col" className="p-2 whitespace-nowrap text-sm">
                Stock Status
              </th>
              <th scope="col" className="p-2 whitespace-nowrap text-sm">
                Quantity
              </th>
              <th scope="col" className="p-2 whitespace-nowrap text-sm">
                Total Price
              </th>
              <th scope="col" className="p-2 whitespace-nowrap text-sm"></th>
            </tr>
          </thead>

          <tbody>
            {cartItem.length > 0 ? (
              cartItem?.map((cart) => {
                return (
                  <tr
                    className={`border-b ${
                      cart?.quantity > cart?.product?.stock && "bg-red-50"
                    }`}
                    key={cart?._id}
                  >
                    <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                      <img
                        src={cart?.product?.images[0]?.url}
                        alt=""
                        className="w-[50px] rounded"
                      />
                    </td>
                    <td className="p-2 font-medium text-gray-900 whitespace-nowrap capitalize">
                      {cart?.product?.name}
                    </td>
                    <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                      <span
                        className={` font-semibold text-cetner py-1 px-3 rounded-full ${
                          cart?.product?.stock === 0
                            ? "bg-red-100 text-red-500"
                            : "bg-green-50 text-green-500"
                        }`}
                      >
                        {cart?.product?.stock}
                      </span>
                    </td>
                    <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
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
                    </td>
                    <td className="p-2 text-gray-900 font-semibold">
                      {cart?.product?.sellPrice
                        ? cart?.quantity * cart?.product?.sellPrice
                        : cart?.quantity * cart?.product?.price}
                    </td>
                    <td className="p-2">
                      <IconButton
                        variant="text"
                        onClick={() => deleteCartItem(cart?.product?._id)}
                      >
                        <TrashIcon className="w-4 text-red-500" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <AlertError
                    text={"You haven't select any product to your cart"}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Shipping address */}
      <h2 className="font-semibold mb-10 text-3xl border-b-2 border-b-blue-500 inline-block">
        Shipping Address
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target);
        }}
        className="p-5 border rounded-md mb-16 shadow-md text-start "
      >
        <div className="text-center mb-3">
          {" "}
          <h3 className="font-semibold text-gray-600 text-lg">
            Personal Informations
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          <div>
            <label htmlFor="name" className="text-sm mb-1 inline-block">
              Enter your full Name
            </label>
            <Input label="Full Name" id="name" name="name" required />
          </div>
          <div>
            <label htmlFor="email" className="text-sm mb-1 inline-block">
              Enter an active email
            </label>
            <Input
              label="Email"
              id="email"
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm mb-1 inline-block">
              Mobile number
            </label>
            <Input
              label="Phone"
              id="phone"
              name="phone"
              type="tel"
              required
              pattern="^\d{1,15}$"
            />
          </div>
        </div>

        <div className="text-center mb-3">
          {" "}
          <h3 className="font-semibold text-gray-600 text-lg mt-8">Address</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          <div>
            <label htmlFor="division" className="text-sm mb-1 inline-block">
              Select Your Division
            </label>
            <Select
              id="division"
              label="Select Disvision"
              onChange={(e) => console.log(e)}
            >
              <Option value="bangladesh">bangladesh</Option>
              <Option value="afganistan">afganistan</Option>
            </Select>
          </div>
          <div>
            <label htmlFor="district" className="text-sm mb-1 inline-block">
              Select Your District
            </label>
            <Select id="district" label="Select District">
              <Option value="bangladesh">bangladesh</Option>
              <Option value="afganistan">afganistan</Option>
            </Select>
          </div>
          <div>
            <label htmlFor="upazila" className="text-sm mb-1 inline-block">
              Select Your Upazila
            </label>
            <Select id="upazila" label="Select Upazila" name="upazilla">
              <Option value="bangladesh">bangladesh</Option>
              <Option value="afganistan">afganistan</Option>
            </Select>
          </div>

          <div>
            <label htmlFor="area" className="text-sm mb-1 inline-block">
              Area/Village
            </label>
            <Input label="Area/Village" required name="area" id="area" />
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutLft;
