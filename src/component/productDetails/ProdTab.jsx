import React from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import parse from "html-react-parser";
import { useGetProductReviewsQuery } from "../../features/review/reviewApi";
import { LoaderSmall } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";
import ReactStars from "react-stars";

const ProdTab = ({ data }) => {
  const { isLoading, data: reviews } = useGetProductReviewsQuery(
    data?.data?._id
  );
  const [activeTab, setActiveTab] = useState("Description");

  let productReveiws;
  if (isLoading) {
    productReveiws = <LoaderSmall />;
  }
  if (reviews?.data?.length === 0) {
    productReveiws = <AlertError text="No reviews available" />;
  }
  if (reviews?.data?.length > 0) {
    productReveiws = reviews?.data.map((d) => {
      return (
        <div className="mb-8" key={d?._id}>
          <div className="flex gap-2">
            <img
              src={d?.user?.avatar?.url || d?.user?.avatar?.default}
              alt=""
              className="w-[50px] rounded-full"
            />

            <div>
              <ReactStars
                count={5}
                size={24}
                value={d?.rating}
                color2={"#FF9933"}
                half={true}
                edit={false}
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
            Reviews ({reviews?.data?.length})
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={"Description"} value={"Description"}>
            <div className="text-start">{parse(data?.data?.description)}</div>
          </TabPanel>
          <TabPanel key={"Review"} value={"Review"}>
            <div className="md:pr-4">{productReveiws}</div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ProdTab;
