import React, { useState, useCallback } from "react";
import DashboardTitle from "../shared/DashboardTitle";
import {
  useGetAllOrdersMutation,
  useUpdateOrderMutation,
} from "../../features/order/orderApi";
import { useEffect } from "react";
import AdmOrderTable from "./AdmOrderTable";
import Pagination from "../shared/Pagination";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { ToastError, ToastSuccess } from "../../utils/Toast";
import { LoaderFullScreen } from "../../utils/Loader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const AdmOrders = () => {
  const [getAllOrders, { isLoading, error, data }] = useGetAllOrdersMutation();
  const [updateOrder, { isLoading: statusLoading }] = useUpdateOrderMutation();
  const [activePageNumber, setPageNumber] = useState(1);
  const [isDelivered, setDelivered] = useState("");
  const [selectedAction, setSelectedAction] = useState();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [serachTxt, setSearchText] = useState("");
  const [shipExpired, setShipExpired] = useState(null);
  const [transId, setTransId] = useState("");
  const limitOrder = 3;

  const handlePaginationAction = (index) => {
    setPageNumber(index);
    setSelectedOrders([]);
  };

  const handleSelectOrders = (e) => {
    if (e.target.checked) {
      setSelectedOrders((prev) => {
        const orders = data?.data?.map((d) => d?._id);
        const result = [...prev, ...orders];
        return result;
      });
    } else {
      setSelectedOrders([]);
    }
  };

  const fetchAllOrders = useCallback(() => {
    const params = new URLSearchParams();
    params.set("limit", limitOrder);
    params.set("page", activePageNumber);
    params.set("delivered", isDelivered);
    if (transId) {
      params.set("transId", transId);
    }
    if (shipExpired) {
      params.set("expired", shipExpired);
    }

    getAllOrders(decodeURIComponent(params))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [getAllOrders, activePageNumber, isDelivered, transId, shipExpired]);

  const updateOrderStatus = () => {
    updateOrder({ orders: selectedOrders, status: selectedAction })
      .unwrap()
      .then((res) => {
        ToastSuccess(res?.message);
        fetchAllOrders();
      })
      .catch((err) => {
        ToastError(err?.data?.message);
      });
  };
  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders, activePageNumber, isDelivered, shipExpired]);
  return (
    <>
      {" "}
      <div className="mt-16 mb-8">
        <DashboardTitle text="All orders" />
      </div>
      <div className="w-10/12 mx-auto flex flex-wrap items-center gap-7 mb-5 text-sm">
        <div className="w-[200px]">
          <Select label="Filter" disabled={shipExpired}>
            <Option
              onClick={() => {
                setPageNumber(1);
                setDelivered("");
                setTransId("");
                setSearchText("");
              }}
            >
              All
            </Option>
            <Option
              onClick={() => {
                setPageNumber(1);
                setDelivered(true);
                setTransId("");
                setSearchText("");
              }}
            >
              Delivered
            </Option>
            <Option
              onClick={() => {
                setPageNumber(1);
                setDelivered(false);
                setTransId("");
                setSearchText("");
              }}
            >
              Processing
            </Option>
          </Select>
        </div>

        {/* -------- product delivery status options --------- */}
        <div className="flex items-center gap-1">
          <Checkbox
            onChange={(e) => handleSelectOrders(e)}
            checked={selectedOrders.length === data?.data.length}
            disabled={shipExpired}
          />
          <div className="w-[200px]">
            <Select
              label="Action"
              className="text-sm"
              disabled={selectedOrders.length <= 0 || shipExpired}
            >
              <Option onClick={() => setSelectedAction(true)}>Delivered</Option>
              <Option onClick={() => setSelectedAction(false)}>
                Processing
              </Option>
            </Select>
          </div>
          <Button
            size="sm"
            variant="gradient"
            className="text-[12px] py-1"
            disabled={
              selectedOrders.length <= 0 ||
              selectedAction === undefined ||
              shipExpired
            }
            onClick={updateOrderStatus}
          >
            Apply
          </Button>
        </div>
        {/* -------search ------- */}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPageNumber(1);
              setDelivered("");
              setTransId(e.target.search.value);
            }}
          >
            <div className="relative flex mx-auto w-[20rem] max-w-[16rem] ">
              <Input
                type="text"
                label="Transection Id"
                name="search"
                className="pr-20"
                value={serachTxt}
                disabled={shipExpired}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                size="sm"
                type="submit"
                disabled={shipExpired}
                className="!absolute right-1 top-1 rounded"
              >
                <MagnifyingGlassIcon className="w-4 h-4 " />
              </Button>
            </div>
          </form>
        </div>
        {/* -- shipping time expired -- */}
      </div>
      <div className="text-start w-10/12 mx-auto mb-5">
        {" "}
        <Checkbox
          id="expired_shipTime"
          label={
            <span className="font-bold text-xl text-gray-900">
              Show shipping time expired orders
            </span>
          }
          onChange={(e) => {
            setPageNumber(1);
            setDelivered("");
            setTransId("");
            setSearchText("");
            setShipExpired(e.target.checked);
          }}
        />
      </div>
      {/* ---------- all products --------- */}
      <div className="relative overflow-x-auto w-10/12 mx-auto">
        <AdmOrderTable
          data={data}
          isLoading={isLoading}
          error={error}
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
        />
      </div>
      <Pagination
        totalProducts={data?.totalResult}
        handlePaginationAction={handlePaginationAction}
        activePageNumber={activePageNumber}
        limit={limitOrder}
      />
      {statusLoading && <LoaderFullScreen />}
    </>
  );
};

export default AdmOrders;
