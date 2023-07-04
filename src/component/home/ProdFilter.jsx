import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Checkbox,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ProdFilter = () => {
  const [filterOptionsToggle, setFilterOptionToggle] = useState({
    category: true,
    color: true,
  });

  function filterTitle(title) {
    setFilterOptionToggle({
      ...filterOptionsToggle,
      [title]: !filterOptionsToggle[title],
    });
  }
  return (
    <div>
      {" "}
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
          onClick={() => filterTitle("category")}
          className="p-0 border-b-0"
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
          onClick={() => filterTitle("color")}
          className="p-0 border-b-0"
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
    </div>
  );
};

function FilterTitle({ text }) {
  return (
    <h5 className="text-black font-semibold pb-1 border-b border-b-black capitalize">
      {text}
    </h5>
  );
}

export default ProdFilter;
