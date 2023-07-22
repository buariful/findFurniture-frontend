import React from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import parse from "html-react-parser";
import { useGetProductReviewsQuery } from "../../features/review/reviewApi";
import { LoaderSmall } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";

const ProdTab = ({ data }) => {
  const { isLoading, data: reviews } = useGetProductReviewsQuery(
    data?.data?._id
  );
  // console.log(reviews);
  const [activeTab, setActiveTab] = useState("Description");

  let productReveiws;
  if (isLoading) {
    productReveiws = <LoaderSmall />;
  }
  console.log(reviews?.data.length === 0);
  if (reviews?.data.length === 0) {
    productReveiws = <AlertError text="No reviews available" />;
  }
  if (reviews?.data.length > 0) {
    productReveiws = reviews?.data.map((d) => {
      return (
        <div className="mb-8">
          <div className="flex gap-2">
            <img
              src={
                d?.user?.avatar?.url
                  ? d?.user?.avatar?.url
                  : d?.user?.avatar?.default
              }
              alt=""
              className="w-[50px] rounded-full"
            />

            <div>
              <ReactStars
                count={5}
                size={19}
                activeColor="#FF9933"
                edit={false}
                isHalf={true}
                value={d?.rating}
              />
              <p>
                by <span className="capitalize">{d?.user?.name}</span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-start mt-2">{d?.comment}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 justify-start"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none ",
          }}
        >
          <Tab
            key={"Description"}
            value={"Description"}
            onClick={() => setActiveTab("Description")}
            className={`${
              activeTab === "Description" && "text-blue-500"
            } w-[150px] pb-3`}
          >
            Description
          </Tab>
          <Tab
            key={"Review"}
            value={"Review"}
            onClick={() => setActiveTab("Review")}
            className={`${
              activeTab === "Review" && "text-blue-500"
            } w-[150px] pb-3`}
          >
            Reviews (1)
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={"Description"} value={"Description"}>
            <div className="text-start">{parse(data?.data?.description)}</div>
          </TabPanel>
          <TabPanel key={"Review"} value={"Review"}>
            <div className="md:pr-4">
              {productReveiws}
              {/* <div className="mb-8">
                <div className="flex gap-2">
                  <img
                    src="https://res.cloudinary.com/dygolqxi7/image/upload/v1689409810/findFurniture/po3hmp17xxc90soep6lq.jpg"
                    alt=""
                    className="w-[50px] rounded-full"
                  />

                  <div>
                    <ReactStars
                      count={5}
                      size={19}
                      activeColor="#FF9933"
                      edit={false}
                      isHalf={true}
                      value={3.5}
                    />
                    <p>by User Name</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-start mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt fuga perferendis atque magnam tempore. Autem
                    ratione recusandae qui? Eos deleniti dolore ipsum suscipit
                    mollitia officia ducimus ipsam nobis debitis rem est
                    asperiores voluptas magnam error dignissimos, incidunt odio
                    nulla expedita eveniet sapiente, hic, aut nemo cum. Animi
                    nihil ut excepturi.
                  </p>
                </div>
              </div> */}
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ProdTab;
