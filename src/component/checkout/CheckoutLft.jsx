import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
const CheckoutLft = () => {
  return (
    <>
      {/* selected products */}
      <h2 className="font-semibold my-10 text-3xl border-b-2 border-b-blue-500 inline-block">
        Your Selected Products
      </h2>
      <div className="relative overflow-x-auto mb-16">
        <table className="w-full text-sm text-left ">
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
                Price
              </th>
              <th scope="col" className="p-2 whitespace-nowrap text-sm"></th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white border-b ">
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <img
                  src={require("../../images/logo.png")}
                  alt=""
                  className="w-[50px] rounded"
                />
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                  In Stock
                </span>
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <ButtonGroup size="sm">
                  <Button className="text-sm font-normal px-3 py-1">-</Button>
                  <Button
                    className="text-[11px] font-normal px-3 py-1 text-black bg-white border cursor-default"
                    variant="text"
                  >
                    1
                  </Button>
                  <Button className="text-sm font-normal px-3 py-1">+</Button>
                </ButtonGroup>
              </td>
              <td className="p-2 text-gray-900 font-semibold">10000</td>
              <td className="p-2">
                <IconButton variant="text">
                  <TrashIcon className="w-4 text-red-500" />
                </IconButton>
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <img
                  src={require("../../images/logo.png")}
                  alt=""
                  className="w-[50px] rounded"
                />
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                  In Stock
                </span>
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <ButtonGroup size="sm">
                  <Button className="text-sm font-normal px-3 py-1">-</Button>
                  <Button
                    className="text-[11px] font-normal px-3 py-1 text-black bg-white border cursor-default"
                    variant="text"
                  >
                    1
                  </Button>
                  <Button className="text-sm font-normal px-3 py-1">+</Button>
                </ButtonGroup>
              </td>
              <td className="p-2 text-gray-900 font-semibold">10000</td>
              <td className="p-2">
                <IconButton variant="text">
                  <TrashIcon className="w-4 text-red-500" />
                </IconButton>
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <img
                  src={require("../../images/logo.png")}
                  alt=""
                  className="w-[50px] rounded"
                />
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                  In Stock
                </span>
              </td>
              <td className="p-2 font-medium text-gray-900 whitespace-nowrap">
                <ButtonGroup size="sm">
                  <Button className="text-sm font-normal px-3 py-1">-</Button>
                  <Button
                    className="text-[11px] font-normal px-3 py-1 text-black bg-white border cursor-default"
                    variant="text"
                  >
                    1
                  </Button>
                  <Button className="text-sm font-normal px-3 py-1">+</Button>
                </ButtonGroup>
              </td>
              <td className="p-2 text-gray-900 font-semibold">10000</td>
              <td className="p-2">
                <IconButton variant="text">
                  <TrashIcon className="w-4 text-red-500" />
                </IconButton>
              </td>
            </tr>
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
