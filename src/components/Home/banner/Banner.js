import React from "react";
import Curousel from "./Curousel";

const Banner = () => {
  return (
    <div className="flex flex-col justify-around p-6 h-[400px] w-11/12 mx-auto z-20 mt-20">
      <div className="flex flex-col h-[40%] justify-center">
        <h1 className="font-bold mb-3 text-4xl text-[#EAB300]">
          Trending Coins
        </h1>
        <p className="text-green-400 font-medium">
          {" "}
          Get all the Info regarding your favorite Crypto Currency
        </p>
      </div>
      <Curousel />
    </div>
  );
};

export default Banner;
