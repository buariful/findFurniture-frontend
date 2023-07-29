import { Card, CardBody } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { LoaderBig } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";
import ReactStars from "react-rating-stars-component";

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
    reviewCards = <AlertError text={error?.data?.message} />;
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
                    size={22}
                    activeColor="#FF9933"
                    edit={false}
                    isHalf={true}
                    value={Math.round(rev?.rating * 2) / 2}
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
