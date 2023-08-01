import { Card, CardBody } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { LoaderBig } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";
import ReactStars from "react-stars";

const UserReviews = ({ reviewData }) => {
  const { isLoading, error, data } = reviewData;
  let reviewCards;
  if (isLoading) {
    reviewCards = (
      <div>
        <LoaderBig />
      </div>
    );
  }
  if (error) {
    reviewCards = (
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <AlertError text={error?.data?.message} />
      </div>
    );
  }
  if (data?.data) {
    reviewCards = data?.data?.map((rev) => {
      return (
        <Card className="bg-[#e1eff7]" key={rev?._id}>
          <CardBody className="text-start">
            <div className="flex justify-center items-center gap-5 border-b border-b-blue-gray px-6 pb-2 text-gray-700 text-start mb-3">
              <img
                src={rev?.product?.images[0].url}
                alt=""
                className="w-[80px] rounded-md"
              />
              <div>
                <Link
                  to={`/product/${rev?.product?._id}`}
                  className="text-base font-semibold hover:text-blue-600 duration-300 capitalize"
                >
                  {rev?.product?.name}
                </Link>
                <div>
                  <ReactStars
                    count={5}
                    edit={false}
                    size={24}
                    value={Math.round(rev?.rating * 2) / 2}
                    color2={"#FF9933"}
                    half={true}
                  />
                </div>
              </div>
            </div>

            <p>{rev?.comment}</p>
          </CardBody>
        </Card>
      );
    });
  }
  return (
    <>
      {reviewCards}
      {/* <Card className="bg-[#e1eff7]">
        <CardBody className="text-start">
          <div className="flex justify-center items-center gap-5 border-b border-b-blue-gray px-6 pb-2 text-gray-700 text-start mb-6">
            <img
              src={require("../../images/logo.png")}
              alt=""
              className="w-[100px]"
            />
            <div>
              <Link
                to="/product/555"
                className="text-base font-semibold hover:text-blue-600 duration-300"
              >
                Product Name
              </Link>
              <div>
                <Rating value={4} readonly />
              </div>
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            itaque, aperiam quos veniam tempora reprehenderit natus temporibus
            doloribus quasi corrupti eligendi aliquid eveniet, sapiente, sequi
            adipisci ea veritatis nulla voluptate!
          </p>
        </CardBody>
      </Card> */}
    </>
  );
};

export default UserReviews;
