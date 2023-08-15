import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
  Input,
  Radio,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Drawer, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilter,
  setBrands,
  setCategories,
  setColors,
  setDiscount,
  setKeyword,
  setPage,
  setPrice,
} from "../../features/searchFilter/searchFilterSlice";
import { LoaderSmall } from "../../utils/Loader";
import { useGetAllBrandsQuery } from "../../features/brand/brandApi";
import colors from "../../app/colors.json";
import { useLocation } from "react-router-dom";
import { AlertError } from "../../utils/Alert";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./prodFilter.css";

const ProdFilter = () => {
  const {
    isLoading: categoryLoading,
    data: categoryData,
    error: categoryError,
  } = useSelector((state) => state.categories);
  const { isLoading: brandLoading, data: brandsData } = useGetAllBrandsQuery();
  const [filterOptionsToggle, setFilterOptionToggle] = useState({
    category: false,
    color: false,
    brand: false,
    discount: true,
    price: true,
  });
  const {
    categories: selectedCategories,
    brands: selectedBrands,
    colors: selectedColors,
    discount: selectedWithDiscount,
    highPrice,
    lowPrice,
  } = useSelector((state) => state.filter);
  const [value, setValue] = useState([lowPrice, highPrice]);
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const filterOptionsToggleHandler = (title) => {
    setFilterOptionToggle({
      ...filterOptionsToggle,
      [title]: !filterOptionsToggle[title],
    });
  };

  const handleColorToggle = (color) => {
    dispatch(setPage(1));
    dispatch(setColors(color));
  };

  const handleDiscount = (value) => {
    dispatch(setPage(1));
    dispatch(setDiscount(value));
  };

  let categories;
  if (categoryLoading) {
    categories = (
      <div className="w-full grid place-items-center">
        <LoaderSmall />
      </div>
    );
  }
  if (categoryData) {
    categories = categoryData?.map((d) => (
      <div key={d._id}>
        <Checkbox
          label={<span className="capitalize">{d?.name}</span>}
          id={d?.name}
          key={d?.name}
          checked={selectedCategories.includes(d.name)}
          onChange={() => {
            dispatch(setPage(1));
            dispatch(setCategories(d?.name));
          }}
        />
      </div>
    ));
  }
  if (categoryError) {
    categories = (
      <div className="py-2">
        <AlertError text={categoryError} />
      </div>
    );
  }

  let brands;
  if (brandLoading) {
    brands = (
      <div className="w-full grid place-items-center">
        <LoaderSmall />
      </div>
    );
  }
  if (brandsData) {
    brands = brandsData?.data?.map((d) => (
      <div key={d._id}>
        <Checkbox
          label={<span className="capitalize">{d?.name}</span>}
          id={d?.name}
          checked={selectedBrands.includes(d.name)}
          onChange={() => {
            dispatch(setPage(1));
            dispatch(setBrands(d?.name));
          }}
        />
      </div>
    ));
  }
  const isFiltering =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedColors.length > 0 ||
    selectedWithDiscount !== null ||
    highPrice !== 40000 ||
    lowPrice !== 0;

  useEffect(() => {
    setValue([lowPrice, highPrice]);
  }, [lowPrice, highPrice]);
  return (
    <>
      {/* ---- filter options ---- */}
      <div className="border-b border-b-blue-500 pb-1 mb-3 hidden xl:flex xl:justify-between xl:items-center">
        <h3 className="font-bold text-lg">Filter</h3>
        {location !== "/category-product" && (
          <Button
            className="flex gap-1 items-center text-sm capitalize font-normal py-1"
            size="sm"
            disabled={!isFiltering}
            onClick={() => dispatch(resetFilter())}
          >
            clear <XMarkIcon className="w-4" />
          </Button>
        )}
      </div>
      <div className="hidden xl:block ">
        <Accordion
          open={filterOptionsToggle.price}
          icon={
            <ChevronDownIcon
              className={`${
                filterOptionsToggle.price ? "rotate-180" : "rotate-0"
              } duration-300 w-4`}
            />
          }
          className="text-start mb-6"
        >
          <AccordionHeader
            onClick={() => filterOptionsToggleHandler("price")}
            className="p-0 border-b-0 text-sm"
          >
            <FilterTitle text="Price" />
          </AccordionHeader>
          <AccordionBody className="py-4">
            <div className="flex justify-between text-[12px] items-center mb-1">
              <span>{value[0]}</span>
              <span>{value[1]}</span>
            </div>
            <RangeSlider
              id="price_range_slider"
              min={0}
              max={40000}
              step={500}
              value={value}
              onThumbDragEnd={() => dispatch(setPrice(value))}
              onInput={setValue}
            />
          </AccordionBody>
        </Accordion>

        {location === "/category-product" ? (
          ""
        ) : (
          <Accordion
            open={filterOptionsToggle.category}
            icon={
              <ChevronDownIcon
                className={`${
                  filterOptionsToggle.category ? "rotate-180" : "rotate-0"
                } duration-300 w-4`}
              />
            }
            className="text-start mb-6"
          >
            <AccordionHeader
              onClick={() => filterOptionsToggleHandler("category")}
              className="p-0 border-b-0 text-sm"
            >
              <FilterTitle text="categories" />
            </AccordionHeader>

            <AccordionBody className="pt-2 pb-0">{categories}</AccordionBody>
          </Accordion>
        )}

        <Accordion
          open={filterOptionsToggle.color}
          icon={
            <ChevronDownIcon
              className={`${
                filterOptionsToggle.color ? "rotate-180" : "rotate-0"
              } duration-300 w-4`}
            />
          }
          className="text-start mb-6 "
        >
          <AccordionHeader
            onClick={() => filterOptionsToggleHandler("color")}
            className="p-0 border-b-0 text-sm"
          >
            <FilterTitle text="color" />
          </AccordionHeader>

          <AccordionBody className="pt-2 pb-0">
            {colors.colors.map((color, i) => (
              <div key={color?.value + i}>
                <Checkbox
                  label={<span className="capitalize">{color?.value}</span>}
                  id={color?.value}
                  checked={selectedColors.includes(color?.value)}
                  onChange={() => handleColorToggle(color?.value)}
                />
              </div>
            ))}
          </AccordionBody>
        </Accordion>

        <Accordion
          open={filterOptionsToggle.brand}
          icon={
            <ChevronDownIcon
              className={`${
                filterOptionsToggle.brand ? "rotate-180" : "rotate-0"
              } duration-300 w-4`}
            />
          }
          className="text-start mb-6 "
        >
          <AccordionHeader
            onClick={() => filterOptionsToggleHandler("brand")}
            className="p-0 border-b-0 text-sm"
          >
            <FilterTitle text="brand" />
          </AccordionHeader>

          <AccordionBody className="pt-2 pb-0">{brands}</AccordionBody>
        </Accordion>

        <Accordion
          open={filterOptionsToggle.discount}
          icon={
            <ChevronDownIcon
              className={`${
                filterOptionsToggle.discount ? "rotate-180" : "rotate-0"
              } duration-300 w-4`}
            />
          }
          className="text-start mb-6 "
        >
          <AccordionHeader
            onClick={() => filterOptionsToggleHandler("discount")}
            className="p-0 border-b-0 text-sm"
          >
            <FilterTitle text="discount" />
          </AccordionHeader>

          <AccordionBody className="pt-2 pb-0">
            <div className="capitalize block">
              <Radio
                id="discountProducts"
                name="discount"
                label="Discount Products"
                checked={selectedWithDiscount === true}
                onChange={() => handleDiscount(true)}
              />
            </div>
            <div className="capitalize block">
              <Radio
                id="withoutDiscountProducts"
                name="discount"
                label="without discount"
                checked={selectedWithDiscount === false}
                onChange={() => handleDiscount(false)}
              />
            </div>
            <div className="capitalize block">
              <Radio
                id="allProduct"
                name="discount"
                label="All products"
                checked={selectedWithDiscount === null}
                onChange={() => handleDiscount(null)}
              />
            </div>
          </AccordionBody>
        </Accordion>
      </div>
      {/* --- filter drawer for small screens ----- */}
      <div className="block xl:hidden ">
        <button
          className="border border-blue-500 text-blue-500 px-5 py-1 rounded flex items-center gap-1"
          onClick={() => setFilterOpen(true)}
        >
          <AdjustmentsHorizontalIcon className="w-5" />
          <span>Filter</span>
        </button>
        <Drawer
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          className="p-4 overflow-y-auto"
        >
          <div className="mb-6 flex items-center justify-between pb-1 border-b border-blue-gray">
            <h2 className="font-semibold">Filter</h2>

            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setFilterOpen(false)}
            >
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>

          <div className="relative flex mb-6 mx-auto max-w-[24rem] ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(setKeyword(e.target.search.value));
              }}
            >
              <Input
                type="text"
                label="Search"
                name="search"
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                type="submit"
                className="!absolute right-1 top-1 rounded"
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
              </Button>
            </form>
          </div>
          <Accordion
            open={filterOptionsToggle.price}
            icon={
              <ChevronDownIcon
                className={`${
                  filterOptionsToggle.price ? "rotate-180" : "rotate-0"
                } duration-300 w-4`}
              />
            }
            className="text-start mb-6"
          >
            <AccordionHeader
              onClick={() => filterOptionsToggleHandler("price")}
              className="p-0 border-b-0 text-sm"
            >
              <FilterTitle text="Price" />
            </AccordionHeader>
            <AccordionBody className="py-4">
              <div className="flex justify-between text-[12px] items-center mb-1">
                <span>{value[0]}</span>
                <span>{value[1]}</span>
              </div>
              <RangeSlider
                id="price_range_slider"
                min={0}
                max={40000}
                step={500}
                value={value}
                onThumbDragEnd={() => dispatch(setPrice(value))}
                onInput={setValue}
              />
            </AccordionBody>
          </Accordion>
          <Accordion
            open={filterOptionsToggle.category}
            icon={
              <ChevronDownIcon
                className={`${
                  filterOptionsToggle.category ? "rotate-180" : "rotate-0"
                } duration-300 w-4`}
              />
            }
            className="text-start mb-6"
          >
            <AccordionHeader
              onClick={() => filterOptionsToggleHandler("category")}
              className="p-0 border-b-0 text-sm"
            >
              <FilterTitle text="categories" />
            </AccordionHeader>

            <AccordionBody className="pt-2 pb-0">{categories}</AccordionBody>
          </Accordion>

          <Accordion
            open={filterOptionsToggle.color}
            icon={
              <ChevronDownIcon
                className={`${
                  filterOptionsToggle.color ? "rotate-180" : "rotate-0"
                } duration-300 w-4`}
              />
            }
            className="text-start mb-6 "
          >
            <AccordionHeader
              onClick={() => filterOptionsToggleHandler("color")}
              className="p-0 border-b-0 text-sm"
            >
              <FilterTitle text="color" />
            </AccordionHeader>

            <AccordionBody className="pt-2 pb-0">
              {colors.colors.map((color, i) => (
                <div key={color?.value + i}>
                  <Checkbox
                    label={<span className="capitalize">{color?.value}</span>}
                    id={color?.value}
                    checked={selectedColors.includes(color?.value)}
                    onChange={() => handleColorToggle(color?.value)}
                  />
                </div>
              ))}
            </AccordionBody>
          </Accordion>

          <Accordion
            open={filterOptionsToggle.brand}
            icon={
              <ChevronDownIcon
                className={`${
                  filterOptionsToggle.brand ? "rotate-180" : "rotate-0"
                } duration-300 w-4`}
              />
            }
            className="text-start mb-6 "
          >
            <AccordionHeader
              onClick={() => filterOptionsToggleHandler("brand")}
              className="p-0 border-b-0 text-sm"
            >
              <FilterTitle text="brand" />
            </AccordionHeader>

            <AccordionBody className="pt-2 pb-0">{brands}</AccordionBody>
          </Accordion>

          <Accordion
            open={filterOptionsToggle.discount}
            icon={
              <ChevronDownIcon
                className={`${
                  filterOptionsToggle.discount ? "rotate-180" : "rotate-0"
                } duration-300 w-4`}
              />
            }
            className="text-start mb-6 "
          >
            <AccordionHeader
              onClick={() => filterOptionsToggleHandler("discount")}
              className="p-0 border-b-0 text-sm"
            >
              <FilterTitle text="discount" />
            </AccordionHeader>

            <AccordionBody className="pt-2 pb-0">
              <Radio
                id="discountProductsMbl"
                name="mbl_discount"
                label="Discount Products"
                onChange={() => handleDiscount(true)}
              />
              <Radio
                id="withoutDiscountProductsMbl"
                name="mbl_discount"
                label="without discount"
                onChange={() => handleDiscount(false)}
              />
              <Radio
                id="allProductMbl"
                name="mbl_discount"
                label="All products"
                onChange={() => handleDiscount(null)}
              />
            </AccordionBody>
          </Accordion>
        </Drawer>
      </div>{" "}
    </>
  );
};

const FilterTitle = ({ text }) => {
  return (
    <h5 className="text-black font-semibold pb-1 border-b border-b-black capitalize">
      {text}
    </h5>
  );
};

export default ProdFilter;
