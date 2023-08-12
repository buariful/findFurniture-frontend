import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Spinner,
} from "@material-tailwind/react";
import {
  CurrencyBangladeshiIcon,
  CircleStackIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import JoditEditor from "jodit-react";
import ReactSelect from "react-select";
import { useGetAllCategoriesQuery } from "../../features/category/categoryApi";
import { useGetAllBrandsQuery } from "../../features/brand/brandApi";
import prodColors from "../../app/colors.json";
import { relCateModify, selectedValues } from "../../utils/helper";
import {
  useGetLocationQuery,
  useGetUpazilasMutation,
} from "../../features/locations/locationApi";
import { useUpdateProductMutation } from "../../features/product/productApi";
import { ToastError, ToastSuccess } from "../../utils/Toast";
import { LoaderSmall } from "../../utils/Loader";

const ProductFormInfo = ({ product, refetch }) => {
  const { isLoading, data } = useGetAllCategoriesQuery();
  const { isLoading: dsctLoading, data: districts } =
    useGetLocationQuery("district");
  const [getUpazilas, { isLoading: upzLoading }] = useGetUpazilasMutation();
  const { isLoading: brandLoading, data: brandData } = useGetAllBrandsQuery();
  const [updateProduct, { isLoading: prodUpLoading }] =
    useUpdateProductMutation();
  const [selectingShipping, setSelectingShipping] = useState(null);
  const [prodInfo, setProdInfo] = useState({
    name: "",
    price: "",
    sellPrice: "",
    stock: "",
    category: "",
    relatedProducts_categories: [],
    brand: "",
    colors: [],
    shippingCost: {
      freeShipping: { area: [], time: "" },
      lowShipping: { area: [], time: "", price: "" },
      highShipping: { time: "", price: "" },
    },
    description: "",
  });
  const { freeShipping, highShipping, lowShipping } = prodInfo?.shippingCost;
  const [shipAreas, setShipAreas] = useState({
    freeShipAreas: [],
    lowShipAreas: [],
  });
  const editor = useRef();
  const getTargetedUpazilas = (e, stateText) => {
    setSelectingShipping(stateText);
    getUpazilas(e.value)
      .unwrap()
      .then((res) => setShipAreas({ ...shipAreas, [stateText]: res.data }))
      .catch(() => {});
  };
  const handleTimePrice = (parKey, childKey, value, shipObj) => {
    let expectedValue = value || product?.data?.shippingCost[parKey][childKey];
    setProdInfo({
      ...prodInfo,
      shippingCost: {
        ...prodInfo.shippingCost,
        [parKey]: { ...shipObj, [childKey]: expectedValue },
      },
    });
  };
  const handleSelectAreas = (area, isChecked, key) => {
    let data = prodInfo.shippingCost[key];
    if (isChecked) {
      data.area.push({ label: area.label, value: area.value });
    } else {
      const filterData = data.area.filter((d) => d.label !== area.label);
      data.area = filterData;
    }
    setProdInfo({
      ...prodInfo,
      shippingCost: { ...prodInfo.shippingCost, [key]: data },
    });
  };
  const handleProdUpdate = (e) => {
    e.preventDefault();
    updateProduct({ data: prodInfo, id: product?.data?._id })
      .unwrap()
      .then((res) => {
        refetch();
        ToastSuccess(res?.message);
      })
      .catch((err) => {
        ToastError(err?.data?.message);
      });
  };
  const freeShipUpazilas =
    shipAreas?.freeShipAreas?.length > 0 &&
    shipAreas?.freeShipAreas?.map((area) => {
      const isSelected = lowShipping?.area?.some(
        (item) => item.value === area.value
      );
      if (!isSelected) {
        return (
          <Checkbox
            key={area.id}
            id={area.id + " freeShipping"}
            label={area.name}
            checked={freeShipping?.area?.some((a) => a.value === area.value)}
            onChange={(e) =>
              handleSelectAreas(area, e.target.checked, "freeShipping")
            }
          />
        );
      } else {
        return "";
      }
    });

  const lowShipUpazilas =
    shipAreas?.lowShipAreas?.length > 0 &&
    shipAreas?.lowShipAreas?.map((area) => {
      const isSelected = freeShipping?.area?.some(
        (item) => item?.value === area?.value
      );
      if (!isSelected) {
        return (
          <Checkbox
            key={area.id}
            id={area.id}
            label={area.name}
            checked={lowShipping?.area.some((a) => a.value === area.value)}
            onChange={(e) =>
              handleSelectAreas(area, e.target.checked, "lowShipping")
            }
          />
        );
      } else {
        return "";
      }
    });
  useEffect(() => {
    const shipping = {
      freeShipping: {
        ...product?.data?.shippingCost?.freeShipping,
        area: [...product?.data?.shippingCost?.freeShipping.area],
      },
      lowShipping: {
        ...product?.data?.shippingCost?.lowShipping,
        area: [...product?.data?.shippingCost?.lowShipping?.area],
      },
      highShipping: { ...product?.data?.shippingCost?.highShipping },
    };

    setProdInfo({
      name: product?.data?.name,
      price: product?.data?.price,
      sellPrice: product?.data?.sellPrice,
      stock: product?.data?.stock,
      category: product?.data?.category,
      relatedProducts_categories: product?.data?.relatedProducts_categories,
      brand: product?.data?.brand,
      colors: product?.data?.colors,
      shippingCost: shipping,
      description: product?.data?.description,
    });
  }, [product]);
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
                    onChange={(e) =>
                      setProdInfo({ ...prodInfo, name: e.target.value })
                    }
                    defaultValue={prodInfo?.name}
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
                    onChange={(e) =>
                      setProdInfo({
                        ...prodInfo,
                        price: parseInt(e.target.value),
                      })
                    }
                    defaultValue={prodInfo?.price}
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
                    onChange={(e) =>
                      setProdInfo({
                        ...prodInfo,
                        sellPrice: parseInt(e.target.value),
                      })
                    }
                    defaultValue={prodInfo?.sellPrice || null}
                  />
                </div>
                <div className="text-start">
                  <label
                    htmlFor="stock"
                    className="flex items-center gap-1 mb-2"
                  >
                    Stock <CircleStackIcon className="w-5" />
                  </label>
                  <Input
                    label="Stock"
                    id="stock"
                    name="stock"
                    onChange={(e) =>
                      setProdInfo({
                        ...prodInfo,
                        stock: parseInt(e.target.value),
                      })
                    }
                    defaultValue={prodInfo?.stock}
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
                    closeMenuOnSelect={true}
                    options={
                      data?.data || [{ label: "loading...", value: "loading" }]
                    }
                    isLoading={isLoading}
                    onChange={(e) =>
                      setProdInfo({ ...prodInfo, category: e.label })
                    }
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
                    closeMenuOnSelect={false}
                    isMulti
                    isLoading={isLoading}
                    defaultValue={selectedValues(
                      product?.data?.relatedProducts_categories
                    )}
                    options={
                      data?.data || [{ label: "loading...", value: "loading" }]
                    }
                    className="text-sm capitalize"
                    onChange={(e) =>
                      setProdInfo({
                        ...prodInfo,
                        relatedProducts_categories: relCateModify(e),
                      })
                    }
                  />
                </div>

                <div className="text-start">
                  <label htmlFor="brand" className="mb-2 inline-block">
                    Select Brand
                  </label>
                  <ReactSelect
                    closeMenuOnSelect={true}
                    isLoading={brandLoading}
                    defaultValue={{
                      label: product?.data?.brand,
                      value: product?.data?.brand,
                    }}
                    options={
                      brandData?.data || [
                        { label: "loading...", value: "loading" },
                      ]
                    }
                    className="text-sm capitalize"
                    onChange={(e) =>
                      setProdInfo({ ...prodInfo, brand: e.value })
                    }
                  />
                </div>
                <div className="text-start">
                  <label htmlFor="color" className="mb-2 inline-block">
                    Available Colors
                  </label>
                  <ReactSelect
                    closeMenuOnSelect={true}
                    isMulti
                    defaultValue={selectedValues(product?.data?.colors)}
                    options={prodColors?.colors}
                    className="text-sm capitalize"
                    onChange={(e) =>
                      setProdInfo({ ...prodInfo, colors: relCateModify(e) })
                    }
                  />
                </div>
              </div>

              <div>
                <h4 className="inline-block pb-1 border-b-2 border-b-blue-600 mb-8">
                  Shipping Options
                </h4>

                {/* -------------- free shipping ------------- */}
                <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
                  Free Shipping
                </p>
                <div className="pb-3 grid grid-cols-12 gap-5">
                  <div className="col-span-12 flex flex-wrap justify-center gap-2">
                    {freeShipping?.area?.length > 0 &&
                      freeShipping?.area?.map((area) => (
                        <p
                          className="bg-[#eee] p-1 rounded flex items-center gap-1 text-sm"
                          key={area?.value}
                        >
                          <span>{area?.label}</span>
                          <XMarkIcon
                            className="w-4 cursor-pointer"
                            onClick={() =>
                              handleSelectAreas(area, false, "freeShipping")
                            }
                          />
                        </p>
                      ))}
                  </div>
                  <div className="col-span-6 text-start">
                    <div>
                      <label className="mb-2 inline-block">
                        Select District
                      </label>
                      <ReactSelect
                        className="capitalize text-sm"
                        options={
                          districts?.data || [
                            { label: "loading...", value: "loading" },
                          ]
                        }
                        isLoading={dsctLoading}
                        closeMenuOnSelect={true}
                        onChange={(e) =>
                          getTargetedUpazilas(e, "freeShipAreas")
                        }
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
                        defaultValue={freeShipping?.time}
                        onChange={(e) =>
                          handleTimePrice(
                            "freeShipping",
                            "time",
                            parseInt(e.target.value),
                            freeShipping
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-6 text-sm flex flex-wrap justify-start ">
                    {upzLoading && selectingShipping === "freeShipAreas" ? (
                      <div className="grid place-items-center w-full">
                        <LoaderSmall />
                      </div>
                    ) : (
                      freeShipUpazilas
                    )}
                  </div>
                </div>

                {/* ---------------- low shipping ------------- */}
                <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
                  Low Shipping
                </p>
                <div className="pb-3 grid grid-cols-12 gap-5">
                  <div className="col-span-12 flex flex-wrap justify-center gap-2">
                    {lowShipping?.area?.length > 0 &&
                      lowShipping?.area?.map((area, i) => (
                        <p
                          className="bg-[#eee] p-1 rounded flex items-center gap-1 text-sm"
                          key={i}
                        >
                          <span>{area.label}</span>
                          <XMarkIcon
                            className="w-4 cursor-pointer"
                            onClick={() =>
                              handleSelectAreas(area, false, "lowShipping")
                            }
                          />
                        </p>
                      ))}
                  </div>

                  <div className="col-span-6 text-start">
                    <div>
                      <label className="mb-2 inline-block">
                        Shipping Areas
                      </label>
                      <ReactSelect
                        options={
                          districts?.data || [
                            { label: "loading...", value: "loading" },
                          ]
                        }
                        isLoading={dsctLoading}
                        className="text-sm capitalize"
                        closeMenuOnSelect={true}
                        onChange={(e) => getTargetedUpazilas(e, "lowShipAreas")}
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
                        defaultValue={lowShipping.price}
                        onChange={(e) =>
                          handleTimePrice(
                            "lowShipping",
                            "price",
                            parseInt(e.target.value),
                            lowShipping
                          )
                        }
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
                        defaultValue={lowShipping.time}
                        onChange={(e) =>
                          handleTimePrice(
                            "lowShipping",
                            "time",
                            parseInt(e.target.value),
                            lowShipping
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-6 text-sm flex flex-wrap justify-start">
                    {upzLoading && selectingShipping === "lowShipAreas" ? (
                      <div className="grid place-items-center w-full">
                        <LoaderSmall />
                      </div>
                    ) : (
                      lowShipUpazilas
                    )}
                  </div>
                </div>

                {/* ----------- standard shipping ------------ */}
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
                      id="highShipCost"
                      name="highShipCost"
                      type="number"
                      defaultValue={highShipping?.price}
                      onChange={(e) =>
                        handleTimePrice(
                          "highShipping",
                          "price",
                          parseInt(e.target.value),
                          highShipping
                        )
                      }
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
                      defaultValue={highShipping?.time}
                      onChange={(e) =>
                        handleTimePrice(
                          "highShipping",
                          "time",
                          parseInt(e.target.value),
                          highShipping
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <JoditEditor
                  ref={editor}
                  value={prodInfo?.description}
                  onChange={(newContent) => {
                    setProdInfo({ ...prodInfo, description: newContent });
                  }}
                />
              </div>

              <div className="mt-10 ">
                <Button variant="gradient" type="submit">
                  {prodUpLoading ? (
                    <Spinner className="w-5" />
                  ) : (
                    <span>Update</span>
                  )}
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
