import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Spinner,
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
import {
  useGetDistrictMutation,
  useGetLocationQuery,
  useGetUpazilasMutation,
} from "../../features/locations/locationApi";
import ReactSelect from "react-select";

const CheckoutLft = ({ props }) => {
  const {
    personalInfo,
    setPersonalInfo,
    address,
    setAddress,
    setShippingInfo,
  } = props;
  const cartItem = useSelector((state) => state.user?.data?.cartItem);
  const [updateProdOfCart, { isLoading }] = useUpdateProdOfCartMutation();
  const [deleteProdFromCart] = useDeleteProdFromCartMutation();
  const { data, isLoading: dvsLoading } = useGetLocationQuery("division");
  const [getDistrict, { data: districts, isLoading: dstLoading }] =
    useGetDistrictMutation();
  const [getUpazilas, { data: upazilas, isLoading: upzLoading }] =
    useGetUpazilasMutation();
  const dispatch = useDispatch();
  const [quantityError, setQuantityError] = useState("");
  const [clickedProdId, setClickedProdId] = useState(null);

  const updateCartProuctQuantity = (productId, quantity) => {
    setClickedProdId(productId);
    const data = { productId, quantity };
    updateProdOfCart(data)
      .unwrap()
      .then(() => {
        dispatch(updateCartProdQuantity(data));
      })
      .catch(() => {});
  };

  const deleteCartItem = (productId) => {
    deleteProdFromCart(productId)
      .unwrap()
      .then((res) => dispatch(deleteFromCart(productId)))
      .catch(() => {});
  };

  const handleDivision = (division) => {
    getDistrict(division.value)
      .unwrap()
      .catch(() => {});
    setAddress({ division: division, district: "", upazila: "", area: "" });
    setShippingInfo({ cost: "", time: "" });
  };
  const handleDistrict = (district) => {
    getUpazilas(district.value)
      .unwrap()
      .catch(() => {});
    setAddress({ ...address, district: district, upazila: "", area: "" });
    setShippingInfo({ cost: "", time: "" });
  };
  const handleUpazila = (upazila) => {
    setAddress({ ...address, upazila: upazila, area: "" });
    let matchedShippingCost = 0;
    let shippingTime = 0;

    cartItem.forEach((item) => {
      const { freeShipping, lowShipping, highShipping } =
        item.product.shippingCost;
      if (freeShipping?.area.find((ar) => upazila?.value === ar.value)) {
        matchedShippingCost += 0;
        if (freeShipping?.time > shippingTime) {
          shippingTime = freeShipping?.time;
        }
      } else if (lowShipping?.area.find((ar) => upazila?.value === ar.value)) {
        matchedShippingCost += lowShipping.price;
        if (lowShipping?.time > shippingTime) {
          shippingTime = lowShipping?.time;
        }
      } else {
        matchedShippingCost += highShipping.price;
        if (highShipping?.time > shippingTime) {
          shippingTime = highShipping?.time;
        }
      }
    });

    setShippingInfo({ cost: matchedShippingCost, time: shippingTime });
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
      <div className="relative overflow-x-auto mb-6 md:mb-16">
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
            {cartItem?.length > 0 ? (
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
                          {clickedProdId === cart?.product?._id && isLoading ? (
                            <Spinner className="w-3" />
                          ) : (
                            <span>{cart?.quantity}</span>
                          )}
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

      <div className="p-3 rounded text-slate-800 text-sm bg-green-50 text-start">
        <p className="text-gray-500 text-center text-sm italic">
          It's a static text. Just for testing...
        </p>
        <p>
          <span className="font-semibold">Free shipping areas -- </span> Dhaka-
          Adabor,Airport, Badda, Banani
        </p>
        <p>
          <span className="font-semibold">Low shipping areas -- </span> Dhaka-
          Demra, Dhamrai, Dhanmondi
        </p>
        <p>
          <span className="font-semibold">Standard shipping areas -- </span>{" "}
          Others Areas
        </p>
      </div>

      <form className="p-5 border rounded-md md:mb-16 shadow-md text-start ">
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
            <Input
              label="Full Name"
              id="name"
              name="name"
              value={personalInfo?.name}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, name: e.target.value })
              }
            />
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
              value={personalInfo?.email}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, email: e.target.value })
              }
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
              value={personalInfo?.mblNumber}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, mblNumber: e.target.value })
              }
              type="tel"
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
            <ReactSelect
              closeMenuOnSelect={true}
              className="text-[13px]"
              value={address?.division}
              onChange={(e) => handleDivision(e)}
              options={
                data?.data || [{ label: "loading...", value: "loading" }]
              }
              isLoading={dvsLoading}
            />
          </div>
          <div>
            <label htmlFor="district" className="text-sm mb-1 inline-block">
              Select Your District
            </label>
            <ReactSelect
              closeMenuOnSelect={true}
              className="text-[13px]"
              value={address?.district}
              isDisabled={!address?.division}
              onChange={(e) => handleDistrict(e)}
              isLoading={dstLoading}
              options={
                districts?.data || [{ label: "Loading...", value: "loading" }]
              }
            />
          </div>
          <div>
            <label htmlFor="upazila" className="text-sm mb-1 inline-block">
              Select Your Upazila
            </label>
            <ReactSelect
              closeMenuOnSelect={true}
              className="text-[13px]"
              isDisabled={!address?.district}
              value={address?.upazila}
              onChange={(e) => handleUpazila(e)}
              isLoading={upzLoading}
              options={
                upazilas?.data || [{ label: "Loading...", value: "loading" }]
              }
            />
          </div>

          <div>
            <label htmlFor="area" className="text-sm mb-1 inline-block">
              Area/Village
            </label>
            <Input
              label="Area/Village"
              name="area"
              id="area"
              value={address?.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutLft;
