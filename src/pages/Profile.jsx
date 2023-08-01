import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import DashboardTitle from "../component/shared/DashboardTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  useUserPasswordUpdateMutation,
  useUserProfileUpdateMutation,
} from "../features/user/userApi";
import { setUser } from "../features/user/userSlice";
import { ToastError, ToastSuccess } from "../utils/Toast";
import { AlertError } from "../utils/Alert";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const user = useSelector((state) => state.user?.data);
  const [userProfileUpdate, { isLoading }] = useUserProfileUpdateMutation();
  const [userPasswordUpdate, { isLoading: passUpLoading, error: passError }] =
    useUserPasswordUpdateMutation();
  const [profError, setProfError] = useState("");
  const dispatch = useDispatch();
  const [isShowing, setShowPass] = useState(false);
  const [profileData, setProfileData] = useState({
    email: "",
    name: "",
  });

  const updateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.set("name", profileData?.name);
    formData.set("email", profileData?.email);
    userProfileUpdate(formData)
      .unwrap()
      .then((res) => {
        setProfError("");
        dispatch(setUser(res?.data));
        ToastSuccess(res?.message);
      })
      .catch((err) => {
        ToastError("Profile update fail");
        setProfError(err?.data?.message);
      });
  };

  const updatePassword = (e) => {
    e.preventDefault();
    const data = {
      oldPassword: e.target.old_pass.value,
      newPassword: e.target.newPass.value,
      confirmPassword: e.target.confirmPass.value,
    };
    userPasswordUpdate(data)
      .unwrap()
      .then((res) => {
        ToastSuccess(res?.message);
        e.target.reset();
      })
      .catch(() => ToastError("Password update failed"));
  };

  useEffect(() => {
    setProfileData({ email: user?.email, name: user?.name });
  }, [user]);
  return (
    <>
      <div className="flex items-center justify-center gap-3 mt-6">
        <img
          src={user?.avatar?.url ? user?.avatar?.url : user?.avatar?.default}
          alt=""
          className="w-[200px] "
        />
        <div className="text-start">
          <p className="capitalize">
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Email:</b> {user?.email}
          </p>
        </div>
      </div>

      {/* ------------ profile update --------- */}
      <div className="my-8">
        <DashboardTitle text="Profile informations" />
      </div>

      {profError && (
        <div className="w-11/12 mx-auto grid place-items-center">
          <AlertError text={profError} />
        </div>
      )}

      <div className="w-11/12 max-w-2xl mx-auto text-center mb-16">
        <Card className="shadow-md px-6 pb-10 bg-gray-100">
          <form
            onSubmit={updateProfile}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
          >
            <div className="mb-4 flex flex-col gap-5 text-start">
              <div>
                <label htmlFor="name" className="mb-2 pl-2 capitalize">
                  Name
                </label>
                <Input
                  size="lg"
                  label="Name"
                  required
                  id="name"
                  name="name"
                  value={profileData?.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 pl-2 capitalize">
                  Your email
                </label>
                <Input
                  size="lg"
                  label="Email"
                  required
                  id="email"
                  name="email"
                  value={profileData?.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="file_input"
                >
                  Update profile picture
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:border-blue-500 px-3 py-2"
                  id="file_input"
                  type="file"
                  name="image"
                  accept="image/*"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 flex gap-2 justify-center items-center"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <Spinner className="w-5" /> : "Update"}
            </Button>
          </form>
        </Card>
      </div>
      {/* ---------- password update ----------- */}
      <div className="my-8">
        <DashboardTitle text="update password" />
      </div>
      {passError && <AlertError text={passError?.data?.message} />}
      <div className="w-11/12 max-w-2xl mx-auto text-center mb-16">
        <Card className="shadow-md px-6 pb-10 bg-gray-100">
          <form
            onSubmit={updatePassword}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
          >
            <div className="mb-4 flex flex-col gap-5 text-start">
              <div>
                <label htmlFor="old_pass" className="mb-2 pl-2 capitalize">
                  Old Password
                </label>
                <Input
                  type={isShowing ? "text" : "password"}
                  id="old_pass"
                  required
                  size="lg"
                  autoComplete="on"
                  icon={
                    isShowing ? (
                      <EyeSlashIcon
                        className="w-4 cursor-pointer"
                        onClick={() => setShowPass(!isShowing)}
                      />
                    ) : (
                      <EyeIcon
                        className="w-4 cursor-pointer"
                        onClick={() => setShowPass(!isShowing)}
                      />
                    )
                  }
                />
              </div>
              <div>
                <label htmlFor="newPass" className="mb-2 pl-2 capitalize">
                  Your New Password
                </label>
                <Input size="lg" required id="newPass" name="newPass" />
              </div>

              <div>
                <label htmlFor="confirmPass" className="mb-2 pl-2 capitalize">
                  Confirm Password
                </label>
                <Input size="lg" required id="confirmPass" name="confirmPass" />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 flex gap-2 justify-center items-center"
              fullWidth
              disabled={passUpLoading}
            >
              {passUpLoading ? <Spinner className="w-5" /> : "Update"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Profile;
