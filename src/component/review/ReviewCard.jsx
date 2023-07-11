import { Card, CardBody, Rating } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const ReviewCard = () => {
  return (
    <div>
      <Card className="bg-[#e1eff7]">
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
      </Card>
    </div>
  );
};

export default ReviewCard;
