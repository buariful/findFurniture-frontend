import React, { useRef, useState } from "react";
import DashboardTitle from "../component/shared/DashboardTitle";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
} from "@material-tailwind/react";
import ReactSelect from "react-select";
import { CurrencyBangladeshiIcon } from "@heroicons/react/24/outline";
import {
  useGetLocationQuery,
  useGetUpazilasMutation,
} from "../features/locations/locationApi";
import JoditEditor from "jodit-react";
import { useCreateProductMutation } from "../features/product/productApi";
import { LoaderFullScreen } from "../utils/Loader";
import { ToastError, ToastSuccess } from "../utils/Toast";
import colors from "../app/colors.json";
import { useGetAllCategoriesQuery } from "../features/category/categoryApi";
import { useGetAllBrandsQuery } from "../features/brand/brandApi";
import { AlertError } from "../utils/Alert";

const AdminCreateProduct = () => {
  const { isLoading, data } = useGetLocationQuery("district");
  const { isLoading: categoryLoad, data: categories } =
    useGetAllCategoriesQuery();
  const { isLoading: brandLoad, data: brands } = useGetAllBrandsQuery();
  const [getUpazilas] = useGetUpazilasMutation();
  const [createProduct, { isLoading: prodLoading, error: prodError }] =
    useCreateProductMutation();
  const [selectedImages, setSelectedImages] = useState([]);
  const [categoryBrand, setCategoryBrand] = useState({
    category: "",
    relatedCategory: [],
    brand: "",
    colors: [],
  });
  const [shippingInfo, setShippingInfo] = useState({
    freeShipping: { area: [], time: "" },
    lowShipping: { area: [], time: "", price: "" },
    highShipping: { time: "", price: "" },
  });
  const [shipAreas, setShipAreas] = useState({
    freeShipAreas: [],
    lowShipAreas: [],
    selectedLowShipAreas: [],
  });
  const editor = useRef(null);
  const [content, setContent] = useState("");
  let districts;
  if (isLoading) {
    districts = [{ label: "loading...", value: "loading..." }];
  }
  if (data) {
    districts = data.data?.map((d) => {
      return { label: d?.name, value: d?.id };
    });
  }

  const getTargetedUpazilas = (result, stateText) => {
    getUpazilas(result.value)
      .unwrap()
      .then((res) => setShipAreas({ ...shipAreas, [stateText]: res.data }))
      .catch(() => {});
  };
  const handleSelectAreas = (area, isChecked, stateText2) => {
    let data = shippingInfo[stateText2];
    if (isChecked) {
      data.area.push({ label: area.label, value: area.value });
    } else {
      const filterData = data.area.filter((d) => d.label !== area.label);
      data.area = filterData;
    }
    setShippingInfo({ ...shippingInfo, [stateText2]: data });
  };
  const handleShippingInfo = (value, stateText, stateKey) => {
    let state = shippingInfo[stateText];
    state = { ...state, [stateKey]: value };

    setShippingInfo({ ...shippingInfo, [stateText]: state });
  };

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);
    const selectedImagesArray = files.map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
    }));
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...selectedImagesArray,
    ]);
  };

  const handleImageDelete = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const updatedImages = [...prevSelectedImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  const handleProdCreate = (e) => {
    e.preventDefault();
    const { name, price, sellPrice, stock } = e.target;

    if (parseInt(price.value) < parseInt(sellPrice.value)) {
      return ToastError("Sell price should be smaller than product price");
    }

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("price", price.value);
    formData.append("sellPrice", sellPrice.value);
    formData.set("stock", stock.value);
    formData.append("category", categoryBrand.category);
    formData.append(
      "relatedProducts_categories",
      JSON.stringify(categoryBrand.relatedCategory)
    );
    formData.append("shippingCost", JSON.stringify(shippingInfo));
    formData.append("brand", categoryBrand.brand);
    formData.append("colors", JSON.stringify(categoryBrand.colors));
    formData.append("description", content);
    selectedImages.forEach((image) => {
      formData.append("images", image.file);
    });

    createProduct(formData)
      .unwrap()
      .then((res) => {
        ToastSuccess(res?.message);
        resetState();
        e.target.reset();
      })
      .catch(() => ToastError("Product cann't be created, check the inputs!"));
  };

  const resetState = () => {
    setShipAreas({
      freeShipAreas: [],
      lowShipAreas: [],
    });

    setCategoryBrand({
      category: "",
      relatedCategory: [],
      brand: "",
      colors: [],
    });
    setSelectedImages([]);
    setShippingInfo({
      freeShipping: { area: [], time: "" },
      lowShipping: { area: [], time: "", price: "" },
      highShipping: { time: "", price: "" },
    });
    setContent("");
  };

  const freeShipUpazilas =
    shipAreas?.freeShipAreas?.length > 0 &&
    shipAreas?.freeShipAreas?.map((area) => {
      const isSelected = shippingInfo?.lowShipping?.area?.some(
        (item) => item.value === area.value
      );
      if (!isSelected) {
        return (
          <Checkbox
            key={area.id}
            id={area.id + " freeShipping"}
            label={area.name}
            checked={shippingInfo?.freeShipping?.area?.some(
              (a) => a.value === area.value
            )}
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
      const isSelected = shippingInfo?.freeShipping?.area?.some(
        (item) => item?.value === area?.value
      );
      if (!isSelected) {
        return (
          <Checkbox
            key={area.id}
            id={area.id + " lowShipping"}
            label={area.name}
            checked={shippingInfo?.lowShipping?.area.some(
              (a) => a.value === area.value
            )}
            onChange={(e) =>
              handleSelectAreas(
                area,
                e.target.checked,
                // "selectedLowShipAreas",
                "lowShipping"
              )
            }
          />
        );
      } else {
        return "";
      }
    });
  return (
    <>
      <div className="mt-12 mb-8">
        <DashboardTitle text="Add a product" />
      </div>

      <div className="w-11/12 max-w-4xl mx-auto mb-16">
        <Card>
          <CardBody>
            {prodError && <AlertError text={prodError?.data?.message} />}
            <form onSubmit={handleProdCreate}>
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
                <div className="text-start">
                  <label
                    htmlFor="stock"
                    className="flex items-center gap-1 mb-2"
                  >
                    Product In Stock
                  </label>
                  <Input
                    label="Stock"
                    id="stock"
                    name="stock"
                    type="number"
                    required
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
                    options={categories?.data}
                    isLoading={categoryLoad}
                    className="capitalize text-sm"
                    onChange={(e) => {
                      setCategoryBrand({ ...categoryBrand, category: e.value });
                    }}
                    required
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
                    options={categories?.data}
                    isMulti
                    isLoading={categoryLoad}
                    className="capitalize text-sm"
                    onChange={(e) => {
                      const rel_category = e.map((e) => e.value);
                      setCategoryBrand({
                        ...categoryBrand,
                        relatedCategory: rel_category,
                      });
                    }}
                    required
                  />
                </div>

                <div className="text-start">
                  <label htmlFor="brand" className="mb-2 inline-block">
                    Select Brand
                  </label>
                  <ReactSelect
                    closeMenuOnSelect={true}
                    options={brands?.data}
                    isLoading={brandLoad}
                    className="capitalize text-sm"
                    onChange={(e) =>
                      setCategoryBrand({ ...categoryBrand, brand: e.value })
                    }
                    required
                  />
                </div>
                <div className="text-start">
                  <label htmlFor="color" className="mb-2 inline-block">
                    Select Available Colors
                  </label>
                  <ReactSelect
                    closeMenuOnSelect={false}
                    isMulti
                    className="capitalize text-sm"
                    options={colors?.colors}
                    onChange={(e) => {
                      const colors = e.map((e) => e.value);
                      setCategoryBrand({ ...categoryBrand, colors });
                    }}
                    required
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
                    {shippingInfo?.freeShipping?.area?.length > 0 &&
                      shippingInfo?.freeShipping?.area?.map((area) => (
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
                        className="text-sm capitalize"
                        options={districts}
                        closeMenuOnSelect={true}
                        onChange={(result) =>
                          getTargetedUpazilas(result, "freeShipAreas")
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
                        value={shippingInfo.freeShipping.time}
                        onChange={(e) =>
                          handleShippingInfo(
                            e.target.value,
                            "freeShipping",
                            "time"
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-6 text-sm flex flex-wrap justify-start ">
                    {freeShipUpazilas}
                  </div>
                </div>

                <p className="text-black bg-[#eee] py-2 font-semibold mb-3 ">
                  Low Shipping
                </p>
                <div className="pb-3 grid grid-cols-12 gap-5">
                  <div className="col-span-12 flex flex-wrap justify-center gap-2">
                    {shippingInfo?.lowShipping?.area?.length > 0 &&
                      shippingInfo?.lowShipping?.area?.map((area, i) => (
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
                        className="text-sm capitalize"
                        options={districts}
                        closeMenuOnSelect={true}
                        onChange={(result) =>
                          getTargetedUpazilas(result, "lowShipAreas")
                        }
                        required
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
                        value={shippingInfo.lowShipping.price}
                        onChange={(e) =>
                          handleShippingInfo(
                            e.target.value,
                            "lowShipping",
                            "price"
                          )
                        }
                        required
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
                        value={shippingInfo.lowShipping.time}
                        onChange={(e) =>
                          handleShippingInfo(
                            e.target.value,
                            "lowShipping",
                            "time"
                          )
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="col-span-6 text-sm flex flex-wrap justify-start">
                    {lowShipUpazilas}
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
                      value={shippingInfo.highShipping.price}
                      onChange={(e) =>
                        handleShippingInfo(
                          e.target.value,
                          "highShipping",
                          "price"
                        )
                      }
                      required
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
                      value={shippingInfo.highShipping.time}
                      onChange={(e) =>
                        handleShippingInfo(
                          e.target.value,
                          "highShipping",
                          "time"
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* ----- image upload ----- */}
              <label
                className="block mb-2 font-medium text-gray-900"
                htmlFor="file_input"
              >
                Upload Images Of Proudct
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 focus:border-blue-700 rounded-lg cursor-pointer bg-gray-50 py-2 px-1"
                id="file_input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                required
              />
              <div className="flex justify-center items-center gap-5 my-10">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-[180px] w-[180px] bg-[#eee] rounded grid place-items-center"
                  >
                    <img
                      src={image.previewURL}
                      alt={`Preview ${index}`}
                      className="max-h-[180px]"
                    />
                    <span
                      className="inline-block p-1 absolute top-0 right-0 bg-red-50 hover:bg-red-200 text-black rounded cursor-pointer"
                      onClick={() => handleImageDelete(index)}
                    >
                      <XMarkIcon className="w-4" strokeWidth={2} />
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => {
                    setContent(newContent);
                  }}
                />
              </div>

              <div className="mt-10 ">
                <Button variant="gradient" type="submit">
                  Create
                </Button>
              </div>
            </form>
            {prodLoading && <LoaderFullScreen />}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AdminCreateProduct;
