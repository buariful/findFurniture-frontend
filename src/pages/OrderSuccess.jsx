import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneOrderQuery } from "../features/order/orderApi";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button, Card } from "@material-tailwind/react";
import { LoaderBig } from "../utils/Loader";
import { useEffect } from "react";
import { ToastSuccess } from "../utils/Toast";
import { formatDate } from "../utils/formateDate";

const OrderSuccess = () => {
  const { trans_id } = useParams();
  const { data, isLoading } = useGetOneOrderQuery(trans_id);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      ToastSuccess(data?.message);
    }
  }, [data]);

  return isLoading ? (
    <div className="min-h-[80vh] grid place-items-center">
      <LoaderBig />
    </div>
  ) : (
    <div className="w-11/12 mx-auto my-16">
      <Card className="max-w-lg mx-auto px-10 py-14">
        <div className="flex justify-center items-center gap-3 text-green-500 mb-8">
          <CheckCircleIcon className="w-10 " strokeWidth={2} />
          <span className="text-3xl font-semibold">Payment Successfull</span>
        </div>
        <div className="flex justify-between mb-2 pb-1 border-b border-b-blue-gray">
          <span>Amount Paid</span>
          <span className="text-[13px] text-black text-end">
            {data?.data?.total_amount}
          </span>
        </div>

        <div className="flex justify-between mb-2 pb-1 border-b border-b-blue-gray">
          <span>Shipping Cost</span>
          <span className="text-[13px] text-black text-end">
            {data?.data?.shipping_cost}
          </span>
        </div>
        <div className="flex justify-between mb-2 pb-1 border-b border-b-blue-gray">
          <span>Shipping Time</span>
          <span className="text-[13px] text-black text-end">
            {formatDate(data?.data?.shipping_time)}
          </span>
        </div>

        <div className="flex justify-between mb-2 pb-1 border-b border-b-blue-gray">
          <span>Transaction Id</span>
          <span className="text-[13px] text-black text-end">
            {data?.data?.trans_id}
          </span>
        </div>
        <div className="flex justify-between mb-2 pb-1 border-b border-b-blue-gray">
          <span>Shipping Address</span>
          <span className="text-[13px] text-black text-end">
            {data?.data?.shipping_address}
          </span>
        </div>
      </Card>

      <div className="grid place-items-center mt-7">
        <Button onClick={() => navigate("/dashboard")}>My Orders</Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
