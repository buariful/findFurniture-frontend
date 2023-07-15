import { Bounce, toast } from "react-toastify";
import "./toast.css";

export const ToastSuccess = (text) => {
  return toast(text, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    className: "toast_container",
    progressClassName: "progress_success",
    draggable: true,
    progress: undefined,
    transition: Bounce,
    style: {
      background: "#069506",
      color: "white",
    },
  });
};
export const ToastError = (text) => {
  return toast(text, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    className: "toast_container",
    progressClassName: "progress_error",
    draggable: true,
    progress: undefined,
    transition: Bounce,
    style: {
      background: "#d71f1f",
      color: "white",
    },
  });
};
