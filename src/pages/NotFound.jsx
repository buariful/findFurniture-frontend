import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-11/12 max-w-4xl mx-auto my-10">
      <p className="my-3 text-lg">
        It seems that, you are lost. Go back to home.
      </p>
      <img
        src={require("../images/404-page.jpg")}
        alt=""
        className="max-h-[50vh] mx-auto"
      />
      <Link to="/" className="mt-3 inline-block">
        <Button size="lg">Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
