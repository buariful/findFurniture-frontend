import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import { CurrencyBangladeshiIcon } from "@heroicons/react/24/outline";
import JoditEditor from "jodit-react";
import ReactSelect from "react-select";
import { useGetAllCategoriesQuery } from "../../features/category/categoryApi";
import { useGetAllBrandsQuery } from "../../features/brand/brandApi";
import prodColors from "../../app/colors.json";
import { findUpazilas, selectedValues, upazilaArray } from "../../utils/helper";
import { useGetLocationQuery } from "../../features/locations/locationApi";

const ProductFormInfo = ({ product }) => {
  const { isLoading, data } = useGetAllCategoriesQuery();
  const { isLoading: dsctLoading, data: districts } =
    useGetLocationQuery("district");

  const { isLoading: brandLoading, data: brandData } = useGetAllBrandsQuery();
  const { freeShipping, highShipping, lowShipping } =
    product?.data?.shippingCost;

  const [prodInfo, setProdInfo] = useState({
    name: "",
    prodPrice: "",
    sellPrice: "",
    category: "",
    relatedProducts_categories: [],
    brand: "",
    colors: [],
    shippingCost: {},
    description: "",
  });
  const editor = useRef();

  const handleUpdateValues = () => {};
  const handleProdUpdate = () => {};
  useEffect(() => {
    setProdInfo({
      name: product?.data?.name,
      prodPrice: product?.data?.price,
      sellPrice: product?.data?.sellPrice,
      category: product?.data?.category,
      relatedProducts_categories: product?.data?.relatedProducts_categories,
      brand: product?.data?.brand,
      colors: product?.data?.colors,
      shippingCost: product?.data?.shippingCost,
      description: product?.data?.description,
    });
  }, [product]);

  console.log(product);
  return (
    <>
      <div className="w-11/12 max-w-4xl mx-auto mb-16">
        <Card>
          <CardBody>
            <form onSubmit={handleProdUpdate}>
              {/* ----- product basic ----- */}
              <h4 className="inline-block pb-1 border-b-2 border-b-blue-600 mb-4">
                Basic Info
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 pb-4 border-b border-b-blue-gray">
                <div className="text-start">
                  <label htmlFor="name" className="mb-2 inline-block">
                    Product Name
                  </label>
                  <Input
                    label="Name"
                    id="name"
                    name="name"
                    required
                    value={prodInfo?.name}
                    onChange={(e) =>
                      setProdInfo({ ...prodInfo, name: e.target.value })
                    }
                  />
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
                    value={prodInfo?.prodPrice}
                    onChange={(e) =>
                      setProdInfo({
                        ...prodInfo,
                        prodPrice: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="text-start">
                  <label
                    htmlFor="sellPrice"
                    className="flex items-center gap-1 mb-2"
                  >
                    Sell Price <CurrencyBangladeshiIcon className="w-5" />
                  </label>
                  <Input
                    label="Sell Price"
                    id="sellPrice"
                    name="sellPrice"
                    value={prodInfo?.sellPrice}
                    onChange={(e) =>
                      setProdInfo({
                        ...prodInfo,
                        sellPrice: parseInt(e.target.value),
                      })
                    }
                  />
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
                  <ReactSelect
                    label="Select Colors"
                    closeMenuOnSelect={true}
                    options={data?.data}
                    isLoading={isLoading}
                    defaultValue={{
                      label: product?.data?.category,
                      value: product?.data?.category,
                    }}
                    className="capitalize text-sm"
                  />
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
                    closeMenuOnSelect={false}
                    isMulti
                    isLoading={isLoading}
                    defaultValue={selectedValues(
                      product?.data?.relatedProducts_categories
                    )}
                    options={data?.data}
                    className="text-sm capitalize"
                  />
                </div>

                <div className="text-start">
                  <label htmlFor="brand" className="mb-2 inline-block">
                    Select Brand
                  </label>
                  <ReactSelect
                    label="Select Brand"
                    closeMenuOnSelect={true}
                    isLoading={brandLoading}
                    defaultValue={{
                      label: product?.data?.brand,
                      value: product?.data?.brand,
                    }}
                    options={brandData?.data}
                    className="text-sm capitalize"
                  />
                </div>
                <div className="text-start">
                  <label htmlFor="color" className="mb-2 inline-block">
                    Available Colors
                  </label>
                  <ReactSelect
                    label="Select Colors"
                    id="color"
                    closeMenuOnSelect={true}
                    isMulti
                    defaultValue={selectedValues(product?.data?.colors)}
                    options={prodColors?.colors}
                    className="text-sm capitalize"
                  />
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
                    {/* {shipAreas?.selectedFreeShipAreas?.length > 0 &&
                      shipAreas?.selectedFreeShipAreas?.map((area, i) => (
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
                        options={districts?.data}
                        isLoading={dsctLoading}
                        closeMenuOnSelect={true}
                        isMulti
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
                        value={freeShipping?.time}
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
                        options={prodColors?.data}
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
                  value={prodInfo?.description}
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
