import { Bounce, toast } from "react-toastify";
import "./toast.css";

export const ToastSuccess = (text) => {
  return toast.success(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    className: "toast_container",
    bodyClassName: "!m-0 !p-0 !pr-2 capitalize",
    draggable: true,
    progress: undefined,
    transition: Bounce,
  });
};
export const ToastError = (text) => {
  return toast.error(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    className: "toast_container",
    bodyClassName: "!m-0 !p-0 !pr-2 capitalize",
    draggable: true,
    progress: undefined,
    transition: Bounce,
  });
};
