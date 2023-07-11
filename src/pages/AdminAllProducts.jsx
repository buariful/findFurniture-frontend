import React from "react";
import DashboardTitle from "../component/shared/DashboardTitle";
import ProductsTable from "../component/adminAllProducts/ProductsTable";

const AdminAllProducts = () => {
  return (
    <div>
      <div className="mt-16 mb-8">
        <DashboardTitle text="all products" />
      </div>

      <div>
        <ProductsTable />
      </div>
    </div>
  );
};

export default AdminAllProducts;
