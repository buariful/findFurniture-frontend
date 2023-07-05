import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Checkbox,
  Input,
  Radio,
} from "@material-tailwind/react";
import React, { useState } from "react";
import {
  ChevronDownIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Drawer, IconButton } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import {
  setBrands,
  setCategories,
  setColors,
  setDiscount,
  setKeyword,
} from "../../features/searchFilter/searchFilterSlice";
import { useGetAllCategoriesQuery } from "../../features/category/categoryApi";
import { LoaderSmall } from "../../utils/Loader";
import { useGetAllBrandsQuery } from "../../features/brand/brandApi";

const FilterTitle = ({ text }) => {
  return (
    <h5 className="text-black font-semibold pb-1 border-b border-b-black capitalize">
      {text}
    </h5>
  );
};

const ProdFilter = () => {
  const [filterOptionsToggle, setFilterOptionToggle] = useState({
    category: true,
    color: true,
    brand: true,
    discount: true,
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLoading: categoryLoading, data: categoryData } =
    useGetAllCategoriesQuery();
  const { isLoading: brandLoading, data: brandsData } = useGetAllBrandsQuery();

  const filterOptionsToggleHandler = (title) => {
    setFilterOptionToggle({
      ...filterOptionsToggle,
      [title]: !filterOptionsToggle[title],
    });
  };

  let categories;
  if (categoryLoading) {
    categories = <LoaderSmall />;
  }
  if (categoryData) {
    categories = categoryData?.data?.map((d) => (
      <div>
        <Checkbox
          label={<span className="capitalize">{d?.name}</span>}
          id={d?.name}
          onChange={() => dispatch(setCategories(d?.name))}
        />
      </div>
    ));
  }

  let brands;
  if (brandLoading) {
    brands = <LoaderSmall />;
  }
  if (brandsData) {
    brands = brandsData?.data?.map((d) => (
      <div>
        <Checkbox
          label={<span className="capitalize">{d?.name}</span>}
          id={d?.name}
          onChange={() => dispatch(setBrands(d?.name))}
        />
      </div>
    ));
  }

  return (
    <>
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
          className="p-4"
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
            <Input
              type="text"
              label="Search"
              onChange={(e) => dispatch(setKeyword(e.target.value))}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              // color={email ? "blue" : "blue-gray"}
              // disabled={!email}
              className="!absolute right-1 top-1 rounded"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
            </Button>
          </div>

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

            <AccordionBody className="pt-2 pb-0">
              <div>
                <Checkbox
                  label={<span className="capitalize">Chair</span>}
                  id="chair"
                />
              </div>
              <div>
                <Checkbox
                  label={<span className="capitalize">Table</span>}
                  id="table"
                />
              </div>
            </AccordionBody>
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
              <div>
                <Checkbox
                  label={<span className="capitalize">black</span>}
                  id="black"
                />
              </div>
              <div>
                <Checkbox
                  label={<span className="capitalize">red</span>}
                  id="red"
                />
              </div>
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

            <AccordionBody className="pt-2 pb-0">
              <div>
                <Checkbox
                  label={<span className="capitalize">RFL</span>}
                  id="RFL"
                />
              </div>
              <div>
                <Checkbox
                  label={<span className="capitalize">Pran</span>}
                  id="Pran"
                />
              </div>
            </AccordionBody>
          </Accordion>
        </Drawer>
      </div>{" "}
      {/* ---- filter options ---- */}
      <div className="hidden xl:block ">
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
            <div>
              <Checkbox
                label={<span className="capitalize">black</span>}
                id="black"
                onChange={() => dispatch(setColors("black"))}
              />
            </div>
            <div>
              <Checkbox
                label={<span className="capitalize">white</span>}
                id="white"
                onChange={() => dispatch(setColors("white"))}
              />
            </div>
            <div>
              <Checkbox
                label={<span className="capitalize">red</span>}
                id="red"
                onChange={() => dispatch(setColors("red"))}
              />
            </div>
            <div>
              <Checkbox
                label={<span className="capitalize">pink</span>}
                id="pink"
                onChange={() => dispatch(setColors("pink"))}
              />
            </div>
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

          <AccordionBody className="pt-2 pb-0">
            {brands}
            {/* <div>
              <Checkbox
                label={<span className="capitalize">RFL</span>}
                id="RFL"
                onChange={() => dispatch(setBrands("rfl"))}
              />
            </div>
            <div>
              <Checkbox
                label={<span className="capitalize">Pran</span>}
                id="Pran"
                onChange={() => dispatch(setBrands("pran"))}
              />
            </div> */}
          </AccordionBody>
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
                onClick={() => dispatch(setDiscount(true))}
              />
            </div>
            <div className="capitalize block">
              <Radio
                id="withoutDiscountProducts"
                name="discount"
                label="without discount"
                onClick={() => dispatch(setDiscount(false))}
              />
            </div>
            <div className="capitalize block">
              <Radio
                id="allProductradio"
                name="discount"
                label="All products"
                defaultChecked
                onClick={() => dispatch(setDiscount(null))}
              />
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
};

export default ProdFilter;
