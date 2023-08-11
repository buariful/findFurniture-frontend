import React from "react";
import { useState } from "react";
import { useGetAllUsersMutation } from "../features/user/userApi";
import Pagination from "../component/shared/Pagination";
import { useEffect } from "react";
import { LoaderFullScreen } from "../utils/Loader";
import { useSelector } from "react-redux";

const AdmAllUsers = () => {
  const [getAllUsers, { isLoading, data }] = useGetAllUsersMutation();
  const [pageNum, setPage] = useState(1);
  const adminMail = useSelector((state) => state.user?.data?.email);
  const limitUsers = 20;
  const handlePaginationAction = (number) => {
    setPage(number);
  };

  const users = data?.data?.map((d) => (
    <tr className="bg-white border-b capitalize" key={d?._id}>
      <td className="px-2 py-1">
        <span className="font-semibold">{d?.name}</span>
        {adminMail === d?.email && (
          <span className="inline-block ml-1 bg-green-100 rounded-full px-3 text-[11px]">
            You
          </span>
        )}
      </td>
      <td className="px-2 py-1 text-gray-900 whitespace-nowrap">
        <img
          src={d?.avatar?.url || d?.avatar?.default}
          alt={d?.name}
          className="w-[50px] mx-auto object-cover rounded"
        />
      </td>
      <td className="px-2 py-1 text-gray-900 whitespace-nowrap lowercase">
        {d?.email}
      </td>
      <td className="px-2 py-1 text-gray-900 whitespace-nowrap">{d?.role}</td>
    </tr>
  ));

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", pageNum);
    params.set("limit", limitUsers);
    getAllUsers(decodeURIComponent(params))
      .unwrap()
      .then(() => {})
      .catch(() => {});
  }, [getAllUsers, pageNum]);
  return (
    <div className="my-5">
      <div className="relative overflow-x-auto w-10/12 mx-auto">
        <table className="w-full text-sm  border">
          <thead className="text-xs bg-gray-50 ">
            <tr className="capitalize">
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Name
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Picture
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Email
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Role
              </th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
      </div>

      <Pagination
        handlePaginationAction={handlePaginationAction}
        activePageNumber={pageNum}
        totalProducts={data?.totalResults}
        limit={limitUsers}
      />

      {isLoading && <LoaderFullScreen />}
    </div>
  );
};

export default AdmAllUsers;
