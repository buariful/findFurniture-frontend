import React from "react";
import { CurrencyBangladeshiIcon } from "@heroicons/react/24/outline";
import DashboardTitle from "../../component/shared/DashboardTitle";
import { useUserOrdersQuery } from "../../features/user/userApi";
import { LoaderBig } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";
import { Link } from "react-router-dom";

const UserOrder = () => {
  const { isLoading, error, data } = useUserOrdersQuery();

  let orderContent;
  if (isLoading) {
    orderContent = (
      <div className="grid place-items-center">
        <LoaderBig />
      </div>
    );
  }
  if (error) {
    orderContent = <AlertError text={error?.data?.message} />;
  }
  if (data) {
    orderContent = (
      <table className="w-full text-sm  border">
        <thead className="text-xs bg-gray-50 ">
          <tr className="capitalize">
            <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
              Transaction ID
            </th>
            <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
              Product names
            </th>
            <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
              Delivering Status
            </th>
            <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
              Shipping Address
            </th>
            <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
              Shipping time
            </th>
            <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
              Total Cost
            </th>
            <th
              scope="col"
              className="px-2 py-4 whitespace-nowrap text-sm"
            ></th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((d) => {
            return (
              <tr className="bg-white border-b capitalize" key={d?._id}>
                <td className="px-2 py-1">
                  <span className="font-semibold">{d?.trans_id}</span>
                </td>
                <td className="px-2 py-4 text-gray-900 whitespace-nowrap">
                  {d?.products?.map((prod) => (
                    <Link
                      key={prod?._id}
                      to={`/product/${prod?._id}`}
                      className="font-semibold hover:text-blue-500 duration-300 block"
                    >
                      {prod?.name}
                    </Link>
                  ))}
                </td>
                <td className="px-2 py-4 text-gray-900 whitespace-nowrap">
                  <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                    {d?.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </td>
                <td className="px-2 py-4 text-gray-900 whitespace-nowrap">
                  <span>{d?.shipping_address}</span>
                </td>
                <td className="px-2 py-4 text-gray-900 whitespace-nowrap">
                  <span>{d?.shipping_time} days</span>
                </td>
                <td className="px-2 py-4 text-blue-600 font-bold ">
                  <div className="flex justify-center items-center font">
                    <CurrencyBangladeshiIcon className="w-5" />
                    {d?.total_amount + d?.shipping_cost}
                  </div>
                </td>
                <td className="px-2 py-4 font-semibold"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return (
    <>
      {" "}
      <div className="mt-16 mb-8">
        <DashboardTitle text="my orders" />
      </div>
      <div className="relative overflow-x-auto w-10/12 mx-auto">
        {orderContent}
      </div>
    </>
  );
};

export default UserOrder;
