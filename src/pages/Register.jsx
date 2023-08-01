import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../features/user/userApi";
import { LoaderFullScreen } from "../utils/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { AlertError } from "../utils/Alert";
import { ToastError, ToastSuccess } from "../utils/Toast";

export default function Register() {
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    register({ data: { name, email, password } })
      .unwrap()
      .then((res) => {
        dispatch(setUser(res?.data));
        ToastSuccess(res?.message);
        e.target.email.value = "";
        e.target.password.value = "";
        e.target.name.value = "";
      })
      .catch((err) => {
        console.log(err);
        ToastError("Registration failed");
      });
  };
  return (
    <div className="w-full mt-10 grid place-items-center mb-20">
      {error && <AlertError text={error?.data?.message} />}
      <Card className="shadow-md p-10 bg-gray-100">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          onSubmit={handleRegister}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" required name="name" />
            <Input size="lg" label="Email" required name="email" />
            <Input
              type="password"
              size="lg"
              label="Password"
              required
              name="password"
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            {/* <Spinner className="text-white inline-block mr-1 h-4 w-4" /> */}
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>

      {isLoading && <LoaderFullScreen />}
    </div>
  );
}
