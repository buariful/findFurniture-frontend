import React from "react";
import { LoaderBig, LoaderSmall } from "../utils/Loader";

const Abc = () => {
  return (
    <div className="">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
        perferendis debitis, eum sit, quam voluptas non molestias nostrum
        voluptate quas iure minima. Perferendis quos vel quisquam odit fugiat?
        Laborum, recusandae?
      </p>
      <LoaderBig />
      <button className="bg-red-500 px-5">dddd</button>
      <LoaderSmall />
    </div>
  );
};
export default Abc;
