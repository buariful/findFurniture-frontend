import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/searchFilter/searchFilterSlice";

export default function Pagination({ totalProducts }) {
  const [active, setActive] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const dispatch = useDispatch();

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "blue-gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
    dispatch(setPage(active + 1));
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    dispatch(setPage(active - 1));
  };

  useEffect(() => {
    const pages = Math.ceil(totalProducts / 4);
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
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPage }, (_, index) => (
          <IconButton
            {...getItemProps(index + 1)}
            key={index}
            onClick={() => {
              dispatch(setPage(index + 1));
              setActive(index + 1);
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
        disabled={active === totalPage}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
