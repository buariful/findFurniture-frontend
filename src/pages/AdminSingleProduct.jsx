import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import DashboardTitle from "../component/shared/DashboardTitle";
import ProductFormInfo from "../component/adminSingleProduct/ProductFormInfo";

const AdminSingleProduct = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-blue-50 py-2">
        <Button
          variant="outlined"
          className="flex items-center gap-1 ml-2 text-black px-4 py-2"
          onClick={() => navigate("/dashboard/admin/all-products")}
        >
          <ArrowLeftIcon className="w-5" />
          <span>Back</span>
        </Button>
      </div>

      <div className="mt-10 mb-5">
        <DashboardTitle
          text={
            <>
              <span>Product name</span>
              <span className="text-sm text-gray-700 font-medium inline-block ml-3 ">
                (product code)
              </span>
            </>
          }
        />
      </div>

      <div className="max-w-[350px] w-11/12 mx-auto text-start ">
        <div>
          <p>
            <span className="font-semibold">Category:</span> Table
          </p>
          <p>
            <span className="font-semibold">Brand:</span> RFL
          </p>
          <p>
            <span className="font-semibold">Price:</span> 5000
          </p>
          <p>
            <span className="font-semibold">Sell Price:</span> 5000
          </p>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-6 mb-3">
        <h3 className="font-semibold text-xl text-start">Product Images</h3>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="grid place-items-center">
          <img
            src="https://images.othoba.com/images/thumbs/0473357_regal-5-star-wooden-king-bed_300.jpeg"
            alt=""
            className=""
          />

          <Button className="capitalize">Set Thumbnail</Button>
        </div>
        <div className="grid place-items-center">
          <img
            src="https://images.othoba.com/images/thumbs/0473357_regal-5-star-wooden-king-bed_300.jpeg"
            alt=""
            className=""
          />

          <Button className="capitalize">Set Thumbnail</Button>
        </div>
        <div className="grid place-items-center">
          <img
            src="https://images.othoba.com/images/thumbs/0473357_regal-5-star-wooden-king-bed_300.jpeg"
            alt=""
            className=""
          />

          <Button className="capitalize">Set Thumbnail</Button>
        </div>
        <div className="grid place-items-center">
          <img
            src="https://images.othoba.com/images/thumbs/0473357_regal-5-star-wooden-king-bed_300.jpeg"
            alt=""
            className=""
          />

          <Button className="capitalize">Set Thumbnail</Button>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-6 mb-3">
        <h3 className="font-semibold text-xl text-start">
          Change Product Information
        </h3>
      </div>

      <div className="w-11/12 mx-auto mb-16">
        <Card className=" max-w-4xl">
          <CardBody>
            <form>
              <ProductFormInfo />

              <div className="mt-10 ">
                <Button variant="gradient" type="submit">
                  Update
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AdminSingleProduct;
