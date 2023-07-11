import { Button, Card, Input } from "@material-tailwind/react";
import React from "react";

const Profile = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-3 mt-6">
        <img
          src={require("../images/logo.png")}
          alt=""
          className="w-[200px] "
        />
        <div className="text-start">
          <p>
            <b>Name:</b> Your Name
          </p>
          <p>
            <b>Email:</b> Your Email
          </p>
        </div>
      </div>

      <h2 className="inline-block text-3xl mt-12 mb-8 border-b-2 border-b-blue-500 font-bold pb-2">
        Update My informations.
      </h2>

      <div className="w-11/12 max-w-2xl mx-auto text-center mb-16">
        <Card className="shadow-md px-6 pb-10 bg-gray-100">
          <form
            // onSubmit={}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
          >
            <div className="mb-4 flex flex-col gap-5 text-start">
              <div>
                <label htmlFor="name" className="mb-2 pl-2 capitalize">
                  Name
                </label>
                <Input size="lg" label="Name" required id="name" name="name" />
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
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="mb-2 pl-2 capitalize">
                  New Password
                </label>
                <Input
                  size="lg"
                  label="New Password"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 pl-2 capitalize"
                >
                  confirm Password
                </label>
                <Input
                  size="lg"
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  for="file_input"
                >
                  Update profile picture
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:border-blue-500 px-3 py-2"
                  id="file_input"
                  type="file"
                  accept="image/*"
                />
                <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
            </div>

            <Button type="submit" className="mt-6" fullWidth>
              Update
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Profile;
