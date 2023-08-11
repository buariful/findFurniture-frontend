import React from "react";
import { LoaderSmall } from "../../utils/Loader";
import { Button, Checkbox, Input, Radio } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const FilterOption = ({
  ctgLoading,
  categories,
  brnLoading,
  brands,
  filter,
  setFilter,
}) => {
  const categoryBrandToggle = (key, value) => {
    let data = filter[key];
    if (data.includes(value)) {
      data = filter[key].filter((d) => d !== value);
    } else {
      data.push(value);
    }
    setFilter({ ...filter, [key]: data });
  };

  let allCategories;
  if (ctgLoading) {
    allCategories = (
      <div className="w-full grid place-items-center">
        <LoaderSmall />
      </div>
    );
  }
  if (categories) {
    allCategories = categories?.data?.map((d) => {
      return (
        <Checkbox
          label={<span className="text-sm inline-block mr-2">{d?.label}</span>}
          key={d?._id}
          id={d?._id}
          onChange={() => categoryBrandToggle("categories", d?.value)}
        />
      );
    });
  }

  let allBrands;
  if (brnLoading) {
    allBrands = (
      <div className="w-full grid place-items-center">
        <LoaderSmall />
      </div>
    );
  }
  if (brands) {
    allBrands = brands?.data?.map((d) => {
      return (
        <Checkbox
          label={<span className="text-sm inline-block mr-2">{d?.label}</span>}
          key={d?._id}
          id={d?._id}
          onChange={() => categoryBrandToggle("brands", d?.value)}
        />
      );
    });
  }
  return (
    <div className="w-11/12 mx-auto mb-8">
      <div className="grid grid-cols-1  mb-3 ">
        <div className="text-start">
          <h3 className="font-semibold mb-1">Categories</h3>
          {allCategories}
        </div>

        <div className="text-start">
          <h3 className="font-semibold mb-1">Brands</h3>
          {allBrands}
        </div>
      </div>

      <div className="flex items-center">
        {" "}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilter({ ...filter, search: e.target.search.value });
          }}
        >
          <div className="relative flex mx-auto w-[12rem]">
            <Input
              type="text"
              label="Search"
              name="search"
              className="pr-16"
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value });
              }}
            />
            <Button
              size="sm"
              type="submit"
              className="!absolute right-0 top-1 rounded"
            >
              <MagnifyingGlassIcon className="w-4 h-4 " />
            </Button>
          </div>
        </form>
        <div className="ml-5 flex items-center gap-4">
          <Radio
            className="w-4 h-4"
            name="stock"
            id="all"
            label={<span className="text-sm font-semibold">All</span>}
            onChange={() => setFilter({ ...filter, stock: "" })}
            defaultChecked
          />
          <Radio
            name="stock"
            id="inStock"
            className="w-4 h-4"
            label={<span className="text-sm font-semibold">In Stock</span>}
            onChange={() => setFilter({ ...filter, stock: true })}
          />
          <Radio
            className="w-4 h-4"
            id="stockOut"
            name="stock"
            label={<span className="text-sm font-semibold">Out of Stock</span>}
            onChange={() => setFilter({ ...filter, stock: false })}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterOption;
