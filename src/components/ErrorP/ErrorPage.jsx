import React from "react";
import Banner from "../../assets/img_404.png";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const err = useRouteError();
  return (
    <div className="flex justify-center align-middle">
        <h1 className="text-xl text-center justify-center flex align-middle">
          {err.status} : {err.statusText}
        </h1>
      <div className="my-[4vw]">
        <img src={Banner} alt="" />
      </div>
    </div>
  );
};

export default ErrorPage;
