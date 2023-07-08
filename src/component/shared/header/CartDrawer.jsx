import {
  Button,
  ButtonGroup,
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import React from "react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CartDrawer = ({ state, setState }) => {
  return (
    <div>
      {/* cart drawer */}
      <Drawer
        placement="right"
        open={state}
        onClose={() => setState(false)}
        className={`p-5 xs:!max-w-[350px] ${
          !state && "xs:!translate-x-[350px] duration-300"
        }`}
      >
        <div className="w-11/12 flex justify-between items-center border-b border-b-blue-gray mb-5">
          <h4 className="font-semibold text-lg">Cart Items</h4>

          <IconButton
            variant="text"
            className="text-black hover:text-blue-500"
            onClick={() => setState(false)}
          >
            <ArrowRightIcon className="w-4" strokeWidth={3} />
          </IconButton>
        </div>

        <div className="grid grid-cols-12 gap-1 pb-2 border-b border-b-blue-gray ">
          <div className="col-span-8 text-start break-all">
            <Link
              to="/product/id554"
              onClick={() => setState(false)}
              className="text-sm font-semibold mb-1 capitalize hover:text-blue-600"
            >
              name
            </Link>
            <p className="text-sm ">
              Code: <span className="font-semibold">5DS5S</span>
            </p>
            <p className=" text-blue-500 font-semibold mt-1">Tk 50000</p>
            <div>
              <ButtonGroup size="sm" className="mt-2">
                <Button className="text-sm font-normal px-3 py-1">-</Button>
                <Button
                  className="text-[11px] font-normal px-3 py-1 text-black bg-white border cursor-default"
                  variant="text"
                >
                  1
                </Button>
                <Button className="text-sm font-normal px-3 py-1">+</Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex items-center gap-1">
              <img
                src={require("../../../images/logo.png")}
                alt=""
                className="w-full max-w-[90px]"
              />
              <button className="text-red-500">
                <TrashIcon className="w-5" />
              </button>
            </div>
          </div>
        </div>

        <Link to="/checkout" onClick={() => setState(false)}>
          <Button size="sm" className="capitalize text-sm font-normal mt-6">
            {" "}
            Proceed To Checkout
          </Button>
        </Link>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
