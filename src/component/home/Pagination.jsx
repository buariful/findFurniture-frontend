import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Pagination({
  handlePaginationAction,
  activePageNumber,
  totalProducts,
}) {
  const [totalPage, setTotalPage] = useState(1);

  const getItemProps = (index) => ({
    variant: activePageNumber === index ? "filled" : "text",
    color: activePageNumber === index ? "blue" : "blue-gray",
    onClick: () => handlePaginationAction(index),
    className: "rounded-full",
  });

  const next = () => {
    if (activePageNumber === totalPage) return;
    handlePaginationAction(activePageNumber + 1);
  };

  const prev = () => {
    if (activePageNumber === 1) return;
    handlePaginationAction(activePageNumber - 1);
  };

  useEffect(() => {
    const pages = Math.ceil(totalProducts / 10);
    setTotalPage(pages);
  }, [totalProducts]);

  // let pages;
  return (
    <div className="flex flex-wrap w-11/12 max-w-7xl items-center justify-center my-6 gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={activePageNumber === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPage }, (_, index) => (
          <IconButton
            {...getItemProps(index + 1)}
            key={index}
            onClick={() => {
              handlePaginationAction(index + 1);
            }}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={activePageNumber === totalPage}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
