import {
  Card,
  Input,
  Button,
  Typography,
  // Spinner,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/user/userApi";
import { LoaderFullScreen } from "../utils/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { ToastError, ToastSuccess } from "../utils/Toast";
import { AlertError } from "../utils/Alert";
import { useState } from "react";

export default function Login() {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // const email = e.target.email.value;
    // const password = e.target.password.value;
    login({ data: { email, password } })
      .unwrap()
      .then((res) => {
        dispatch(setUser(res?.data));
        ToastSuccess(res?.message);
        // e.target.email.value = "";
        // e.target.password.value = "";
        setEmail("");
        setPassword("");
        const targetedLocation = localStorage.getItem("path") || "/";
        localStorage.removeItem("path");
        navigate(targetedLocation);
      })
      .catch((err) => {
        ToastError("Login failed");
      });
  };

  return (
    <div className="w-full my-10 grid place-items-center">
      {error && <AlertError text={error?.data?.message} />}
      <Card className="shadow-lg p-10 bg-gray-100">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to login.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleLogin}
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>

      {/* login info */}
      <div className="overflow-x-auto w-11/12 max-w-[500px] mx-auto my-8">
        <table className="min-w-full border text-center text-sm font-light ">
          <tbody>
            <tr
              className="border-b font-semibold cursor-pointer hover:bg-blue-gray-50 duration-300"
              onClick={() => {
                setEmail("admin@gmail.com");
                setPassword("111111");
              }}
            >
              <td className="whitespace-nowrap border-r px-4 py-2 font-medium ">
                <span className="font-semibold">Admin</span>
              </td>
              <td className="whitespace-nowrap border-r px-4 py-2">
                admin@gmail.com
              </td>
              <td className="whitespace-nowrap px-4 py-2">111111</td>
            </tr>

            <tr
              className="border-b font-semibold cursor-pointer hover:bg-blue-gray-50 duration-300"
              onClick={() => {
                setEmail("user@gmail.com");
                setPassword("111111");
              }}
            >
              <td className="whitespace-nowrap border-r px-4 py-2 font-medium ">
                <span className="font-semibold">User</span>
              </td>
              <td className="whitespace-nowrap border-r px-4 py-2">
                user@gmail.com
              </td>
              <td className="whitespace-nowrap px-4 py-2">111111</td>
            </tr>
          </tbody>
        </table>
      </div>
      {isLoading && <LoaderFullScreen />}
    </div>
  );
}
