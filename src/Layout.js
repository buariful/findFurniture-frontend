import { useEffect } from "react";
import Footer from "./component/shared/Footer";
import Navbar from "./component/shared/header/Navbar";
import { useGetAllCategoriesQuery } from "./features/category/categoryApi";
import { useDispatch } from "react-redux";
import {
  setAllCategories,
  setCategoryLoading,
  setCategoryError,
} from "./features/category/categorySlice";

export const Layout = ({ children }) => {
  const { data, isLoading, error } = useGetAllCategoriesQuery();
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
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
