import { Button, Card, Input, Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import DashboardTitle from "../component/shared/DashboardTitle";
import { useDispatch, useSelector } from "react-redux";
import { useUserProfileUpdateMutation } from "../features/user/userApi";
import { setUser } from "../features/user/userSlice";
import { ToastError, ToastSuccess } from "../utils/Toast";
import { AlertError } from "../utils/Alert";

const Profile = () => {
  const user = useSelector((state) => state.user?.data);
  const [userProfileUpdate, { isLoading }] = useUserProfileUpdateMutation();
  const [profError, setProfError] = useState("");
  const dispatch = useDispatch();
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
    </>
  );
};

export default Profile;
