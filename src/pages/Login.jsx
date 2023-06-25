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

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login({ data: { email, password } })
      .unwrap()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
    // e.target.email.value = "";
    // e.target.password.value = "";
  };

  return (
    <div className="w-full mt-10 grid place-items-center">
      {isLoading && <LoaderBig />}

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
            {/* <Spinner className="text-white inline-block mr-1 h-4 w-4" /> */}
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
    </div>
  );
}
