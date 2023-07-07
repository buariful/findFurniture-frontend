import React from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";

const Cart = () => {
  return (
    <>
      <h2 className="py-8 font-bold text-2xl my-5 capitalize bg-[#EEEEEE] flex items-center justify-center gap-2">
        wishlist <HeartIcon className="w-8 " />
      </h2>
      <div className="w-11/12 mx-auto mb-16">
        <div class="flex flex-col overflow-x-auto">
          <div class="sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-x-auto">
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-6 py-4"></th>
                      <th scope="col" class="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" class="px-6 py-4 whitespace-nowrap">
                        Stock Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        <img
                          src={require("../images/logo.png")}
                          alt=""
                          className="min-w-[80px] w-[80px] rounded"
                        />
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 capitalize">
                        product 1
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 font-semibold">
                        TK 500
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">In Stock</td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <button className="bg-blue-500 hover:bg-blue-700 duration-300 px-5 py-1 rounded-full text-sm text-white btn">
                          Add to cart
                        </button>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <IconButton className="bg-blue-gray-50 p-1 rounded-full">
                          <TrashIcon className="w-5 text-red-500 " />
                        </IconButton>
                      </td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        <img
                          src={require("../images/logo.png")}
                          alt=""
                          className="min-w-[80px] w-[80px] rounded"
                        />
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 capitalize">
                        product 1
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 font-semibold">
                        TK 500
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">In Stock</td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <button className="bg-blue-500 hover:bg-blue-700 duration-300 px-5 py-1 rounded-full text-sm text-white btn">
                          Add to cart
                        </button>
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <IconButton className="bg-blue-gray-50 p-1 rounded-full">
                          <TrashIcon className="w-5 text-red-500 " />
                        </IconButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
