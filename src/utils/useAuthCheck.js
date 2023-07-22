import { useEffect } from "react";
import { useState } from "react";
import { useGetUserByCookieMutation } from "../features/user/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

const useAuthCheck = () => {
  const [isAuthenticationChecked, setAuthenticationCecked] = useState(false);
  const [getUserByCookie] = useGetUserByCookieMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserByCookie()
      .unwrap()
      .then((res) => {
        dispatch(setUser(res?.data));
        setAuthenticationCecked(true);
      })
      .catch((err) => {
        setAuthenticationCecked(true);
      });
  }, [getUserByCookie, dispatch]);

  return isAuthenticationChecked;
};

export default useAuthCheck;
