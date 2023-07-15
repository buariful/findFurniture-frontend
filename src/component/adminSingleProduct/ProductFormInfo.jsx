import React from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { CurrencyBangladeshiIcon } from "@heroicons/react/24/outline";

const ProductFormInfo = ({ product }) => {
  return (
    <>
      <Card className=" max-w-4xl">
        <CardBody>
          <form>
            {/* ----- product basics ----- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 pb-4 border-b border-b-blue-gray">
              <div className="text-start">
                <label htmlFor="name" className="mb-2 inline-block">
                  Product Name
                </label>
                <Input label="Name" id="name" name="name" required />
              </div>
              <div className="text-start">
                <label htmlFor="price" className="flex items-center gap-1 mb-2">
                  Product Price <CurrencyBangladeshiIcon className="w-5" />
                </label>
                <Input
                  label="Price"
                  id="price"
                  name="price"
                  type="number"
                  required
                />
              </div>
              <div className="text-start">
                <label
                  htmlFor="sellPrice"
                  className="flex items-center gap-1 mb-2"
                >
                  Sell Price <CurrencyBangladeshiIcon className="w-5" />
                </label>
                <Input label="Sell Price" id="sellPrice" name="sellPrice" />
              </div>
            </div>

            {/* ----- product Category and brand ----- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 pb-4 border-b border-b-blue-gray">
              <div className="text-start">
                <label htmlFor="category" className="mb-2 inline-block">
                  Select Category
                </label>
                <Select label="Select Category" id="category">
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
              <div className="text-start">
                <label htmlFor="relatedCategory" className="mb-2 inline-block">
                  Related category
                </label>
                <Select label="Related Category" id="relatedCategory">
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>

              <div className="text-start">
                <label htmlFor="brand" className="mb-2 inline-block">
                  Select Brand
                </label>
                <Select label="Select Brand" id="brand">
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
              <div className="text-start">
                <label htmlFor="color" className="mb-2 inline-block">
                  Select Available Colors
                </label>
                <Select label="Select Colors" id="color">
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
            </div>

            {/* ----- product shippings ----- */}
            <h4 className="inline-block pb-1 border-b-2 border-b-blue-600 mb-8">
              Shipping Options
            </h4>

            <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
              Free Shipping
            </p>
            <div className="pb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="text-start">
                <label htmlFor="freeShipAreas" className="mb-2 inline-block">
                  Shipping Areas
                </label>
                <Input label="Area" id="freeShipAreas" name="freeShipAreas" />
              </div>
              <div className="text-start">
                <label htmlFor="freeShipTime" className="mb-2 inline-block">
                  Time in days (ex: 5-6)
                </label>
                <Input label="Time" id="freeShipTime" name="freeShipTime" />
              </div>
            </div>

            <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
              Low Shipping
            </p>
            <div className="pb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="text-start">
                <label htmlFor="lowShipAreas" className="mb-2 inline-block">
                  Shipping Areas
                </label>
                <Input label="Area" id="lowShipAreas" name="lowShipAreas" />
              </div>
              <div className="text-start">
                <label htmlFor="lowShipCost" className="mb-2 inline-block">
                  Shipping Cost
                </label>
                <Input
                  label="Cost"
                  id="lowShipCost"
                  name="lowShipCost"
                  type="number"
                />
              </div>
              <div className="text-start">
                <label htmlFor="lowShipTime" className="mb-2 inline-block">
                  Time in days (ex: 5-6)
                </label>
                <Input label="Time" id="lowShipTime" name="lowShipTime" />
              </div>
            </div>

            <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
              Standard Shipping
            </p>
            <div className="pb-3 mb-6 border-b border-b-blue-gray grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="text-start">
                <label
                  htmlFor="standardShipAreas"
                  className="mb-2 inline-block"
                >
                  Shipping Areas
                </label>
                <Input
                  label="Area"
                  id="standardShipAreas"
                  name="standardShipAreas"
                />
              </div>
              <div className="text-start">
                <label htmlFor="standardShipTime" className="mb-2 inline-block">
                  Time in days (ex: 5-6)
                </label>
                <Input
                  label="Time"
                  id="standardShipTime"
                  name="standardShipTime"
                />
              </div>
            </div>

            <div className="mt-10 ">
              <Button variant="gradient" type="submit">
                Update
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductFormInfo;
