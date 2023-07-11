import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const AdminSingleProduct = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-blue-50 py-2">
        <Button
          variant="outlined"
          className="flex items-center gap-1 ml-2 text-black px-4 py-2"
          onClick={() => navigate("/dashboard/admin/all-products")}
        >
          <ArrowLeftIcon className="w-5" />
          <span>Back</span>
        </Button>
      </div>
    </>
  );
};

export default AdminSingleProduct;
