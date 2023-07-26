import { useEffect } from "react";
import Footer from "./component/shared/Footer";
import Navbar from "./component/shared/header/Navbar";
import { useGetAllCategoriesQuery } from "./features/category/categoryApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllCategories,
  setCategoryLoading,
  setCategoryError,
} from "./features/category/categorySlice";
import { useState } from "react";
import MenuDrawer from "./component/shared/header/MenuDrawer";
import CartDrawer from "./component/shared/header/CartDrawer";

export const Layout = ({ children }) => {
  const { data, isLoading, error } = useGetAllCategoriesQuery();
  const { data: user } = useSelector((state) => state.user);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setCartDrawer] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(setCategoryLoading(true));
      dispatch(setAllCategories([]));
      dispatch(setCategoryError(""));
    }
    if (data) {
      dispatch(setAllCategories(data.data));
      dispatch(setCategoryLoading(false));
      dispatch(setCategoryError(""));
    }
    if (error) {
      dispatch(setCategoryError(error?.data?.message));
      dispatch(setAllCategories([]));
      dispatch(setCategoryLoading(false));
    }
  }, [data, dispatch, isLoading, error]);
  return (
    <>
      <Navbar setDrawerOpen={setDrawerOpen} setCartDrawer={setCartDrawer} />
      {children}
      <Footer />

      {/* menu drawer */}
      <MenuDrawer
        data={user}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      {/* cartDrawer */}
      <CartDrawer setState={setCartDrawer} state={isCartDrawerOpen} />
    </>
  );
};
