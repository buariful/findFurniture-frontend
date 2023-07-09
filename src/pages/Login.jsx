import {
  Card,
  Input,
  Button,
  Typography,
  // Spinner,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../features/user/userApi";
import { LoaderBig } from "../utils/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { ToastError, ToastSuccess } from "../utils/Toast";
import { AlertError } from "../utils/Alert";

export default function Login() {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login({ data: { email, password } })
      .unwrap()
      .then((res) => {
        dispatch(setUser(res?.data));
        ToastSuccess(res?.message);
        e.target.email.value = "";
        e.target.password.value = "";
      })
      .catch((err) => {
        ToastError("Login failed");
      });
  };

  return (
    <div className="w-full mt-10 mb-16 grid place-items-center">
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
            <Input size="lg" label="Email" name="email" required />
            <Input
              type="password"
              size="lg"
              label="Password"
              name="password"
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

      {error && <AlertError text={error?.data?.message} />}
      {isLoading && <LoaderBig />}
    </div>
  );
}
