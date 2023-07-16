import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { CurrencyBangladeshiIcon } from "@heroicons/react/24/outline";
import JoditEditor from "jodit-react";
import ReactSelect from "react-select";

const ProductFormInfo = ({ product }) => {
  const [prodInfo, setProdInfo] = useState({
    name: "",
    prodPrice: "",
    sellPrice: "",
    category: "",
    relatedCategories: [],
    brand: "",
    colors: [],
    freeShipping: { area: [], time: "" },
    lowShipping: { area: [], time: "", price: "" },
    highShipping: { time: "", price: "" },
    content: "",
  });
  const editor = useRef();
  const colors = [{ label: "a", value: "a" }];

  const handleUpdateValues = () => {};

  const handleProdUpdate = () => {};
  return (
    <>
      <div className="w-11/12 max-w-4xl mx-auto mb-16">
        <Card>
          <CardBody>
            <form onSubmit={handleProdUpdate}>
              {/* ----- product basics ----- */}
              <h4 className="inline-block pb-1 border-b-2 border-b-blue-600 mb-4">
                Basic Info
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 pb-4 border-b border-b-blue-gray">
                <div className="text-start">
                  <label htmlFor="name" className="mb-2 inline-block">
                    Product Name
                  </label>
                  <Input label="Name" id="name" name="name" required />
                </div>
                <div className="text-start">
                  <label
                    htmlFor="price"
                    className="flex items-center gap-1 mb-2"
                  >
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
              <h4 className="inline-block pb-1 border-b-2 border-b-blue-600 mb-4">
                Category and Brand
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 pb-4 border-b border-b-blue-gray">
                <div className="text-start">
                  <label htmlFor="category" className="mb-2 inline-block">
                    Select Category
                  </label>
                  <Select
                    label="Select Category"
                    id="category"
                    name="category"
                    // onChange={(e) =>console.log(e)
                    // }
                    value={prodInfo.category}
                  >
                    <Option value="category 1">category 1</Option>
                    <Option value="category 2">category 2</Option>
                    <Option value="category 3">category 3</Option>
                    <Option value="category 4">category 4</Option>
                    <Option value="category 5">category 6</Option>
                  </Select>
                </div>
                <div className="text-start">
                  <label
                    htmlFor="relatedCategory"
                    className="mb-2 inline-block"
                  >
                    Related category
                  </label>

                  <ReactSelect
                    label="Select Colors"
                    id="relted_category"
                    closeMenuOnSelect={false}
                    isMulti
                    options={colors}
                    // onChange={(e) => {
                    //   const rel_category = e.map((e) => e.value);
                    //   setCategoryBrand({
                    //     ...categoryBrand,
                    //     relatedCategory: rel_category,
                    //   });
                    // }}
                  />
                </div>

                <div className="text-start">
                  <label htmlFor="brand" className="mb-2 inline-block">
                    Select Brand
                  </label>
                  <Select
                    label="Select Brand"
                    id="brand"
                    // onChange={(e) =>
                    //   setCategoryBrand({ ...categoryBrand, brand: e })
                    // }
                    // value={categoryBrand.brand}
                  >
                    <Option value="brand 1">brand 1</Option>
                    <Option value="brand 2">brand 2</Option>
                    <Option value="brand 3">brand 3</Option>
                    <Option value="brand 4">brand 4</Option>
                  </Select>
                </div>
                <div className="text-start">
                  <label htmlFor="color" className="mb-2 inline-block">
                    Select Available Colors
                  </label>
                  <ReactSelect
                    label="Select Colors"
                    id="color"
                    closeMenuOnSelect={false}
                    isMulti
                    options={colors}
                    // onChange={(e) => {
                    //   const colors = e.map((e) => e.value);
                    //   setCategoryBrand({ ...categoryBrand, colors });
                    // }}
                  >
                    <Option value="color 1">color 1</Option>
                    <Option value="color 2">color 2</Option>
                    <Option value="color 3">color 3</Option>
                    <Option value="color 4">color 4</Option>
                  </ReactSelect>
                </div>
              </div>

              {/* ----- product shippings ----- */}
              <div>
                <h4 className="inline-block pb-1 border-b-2 border-b-blue-600 mb-8">
                  Shipping Options
                </h4>

                <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
                  Free Shipping
                </p>
                <div className="pb-3 grid grid-cols-12 gap-5">
                  <div className="col-span-12 flex flex-wrap justify-center gap-2">
                    {/* {shipAreas.selectedFreeShipAreas.length > 0 &&
                    shipAreas.selectedFreeShipAreas.map((area, i) => (
                      <p
                        className="bg-[#eee] p-1 rounded flex items-center gap-1 text-sm"
                        key={i}
                      >
                        <span>{area.name}</span>
                        <XMarkIcon
                          className="w-4 cursor-pointer"
                          onClick={() =>
                            handleSelectAreas(
                              area,
                              false,
                              "selectedFreeShipAreas",
                              "freeShipping"
                            )
                          }
                        />
                      </p>
                    ))} */}
                  </div>
                  <div className="col-span-6 text-start">
                    <div>
                      <label className="mb-2 inline-block">
                        Select District
                      </label>
                      <ReactSelect
                        options={colors}
                        closeMenuOnSelect={true}
                        // onChange={(result) =>
                        //   getTargetedUpazilas(result, "freeShipAreas")
                        // }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="freeShipTime"
                        className="mb-2 inline-block"
                      >
                        Time in days (ex: 5-6)
                      </label>
                      <Input
                        label="Time"
                        id="freeShipTime"
                        type="number"
                        name="freeShipTime"
                        // value={shippingInfo.freeShipping.time}
                        // onChange={(e) =>
                        //   handleShippingInfo(
                        //     e.target.value,
                        //     "freeShipping",
                        //     "time"
                        //   )
                        // }
                      />
                    </div>
                  </div>

                  <div className="col-span-6 text-sm flex flex-wrap justify-start ">
                    {/* {freeShipUpazilas} */}
                  </div>
                </div>

                <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
                  Low Shipping
                </p>
                <div className="pb-3 grid grid-cols-12 gap-5">
                  <div className="col-span-12 flex flex-wrap justify-center gap-2">
                    {/* {shipAreas.selectedLowShipAreas.length > 0 &&
                    shipAreas.selectedLowShipAreas.map((area, i) => (
                      <p
                        className="bg-[#eee] p-1 rounded flex items-center gap-1 text-sm"
                        key={i}
                      >
                        <span>{area.name}</span>
                        <XMarkIcon
                          className="w-4 cursor-pointer"
                          onClick={() =>
                            handleSelectAreas(
                              area,
                              false,
                              "selectedLowShipAreas",
                              "lowShipping"
                            )
                          }
                        />
                      </p>
                    ))} */}
                  </div>

                  <div className="col-span-6 text-start">
                    <div>
                      <label className="mb-2 inline-block">
                        Shipping Areas
                      </label>
                      <ReactSelect
                        options={colors}
                        closeMenuOnSelect={true}
                        // onChange={(result) =>
                        //   getTargetedUpazilas(result, "lowShipAreas")
                        // }
                      />
                    </div>
                    <div className="text-start">
                      <label
                        htmlFor="lowShipCost"
                        className="mb-2 inline-block"
                      >
                        Shipping Cost
                      </label>
                      <Input
                        label="Cost"
                        id="lowShipCost"
                        name="lowShipCost"
                        type="number"
                        // value={shippingInfo.lowShipping.price}
                        // onChange={(e) =>
                        //   handleShippingInfo(
                        //     e.target.value,
                        //     "lowShipping",
                        //     "price"
                        //   )
                        // }
                      />
                    </div>
                    <div className="text-start">
                      <label
                        htmlFor="lowShipTime"
                        className="mb-2 inline-block"
                      >
                        Time in days (ex: 5-6)
                      </label>
                      <Input
                        label="Time"
                        id="lowShipTime"
                        name="lowShipTime"
                        type="number"
                        // value={shippingInfo.lowShipping.time}
                        // onChange={(e) =>
                        //   handleShippingInfo(
                        //     e.target.value,
                        //     "lowShipping",
                        //     "time"
                        //   )
                        // }
                      />
                    </div>
                  </div>

                  <div className="col-span-6 text-sm flex flex-wrap justify-start">
                    {/* {lowShipUpazilas} */}
                  </div>
                </div>

                <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
                  Standard Shipping
                </p>
                <div className="pb-3 mb-6 border-b border-b-blue-gray grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="text-start">
                    <label
                      htmlFor="standardShipPrice"
                      className="mb-2 inline-block"
                    >
                      Shipping Cost
                    </label>
                    <Input
                      label="Cost"
                      type="number"
                      id="standardShipPrice"
                      name="standardShipPrice"
                      // value={shippingInfo.highShipping.price}
                      // onChange={(e) =>
                      //   handleShippingInfo(
                      //     e.target.value,
                      //     "highShipping",
                      //     "price"
                      //   )
                      // }
                    />
                  </div>
                  <div className="text-start">
                    <label
                      htmlFor="standardShipTime"
                      className="mb-2 inline-block"
                    >
                      Time in days (ex: 5-6)
                    </label>
                    <Input
                      label="Time"
                      id="standardShipTime"
                      name="standardShipTime"
                      type="number"
                      // value={shippingInfo.highShipping.time}
                      // onChange={(e) =>
                      //   handleShippingInfo(
                      //     e.target.value,
                      //     "highShipping",
                      //     "time"
                      //   )
                      // }
                    />
                  </div>
                </div>
              </div>
              <div>
                <JoditEditor
                  ref={editor}
                  value={prodInfo.content}
                  // onChange={(newContent) => {
                  //   setContent(newContent);
                  // }}
                />
              </div>

              <div className="mt-10 ">
                <Button variant="gradient" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ProductFormInfo;
