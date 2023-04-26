import React from "react";
import Logo from "../assets/Bitfinex-logo.png";

const Footer = () => {
  return (
    <footer className="mt-2 p-4 bg-black">
      <div className="flex gap-4 sm:ml-10">
        <img src={Logo} className="h-7 sm:h-10  object-cover" />
        <h1 className=" text-[#fdd141] cursor-pointer text-base sm:text-2xl font-bold">
          BITFINEX
        </h1>
        <p className="text-md text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-2">
          © 2023 BITFINEX |
        </p>
        <p className="mt-2 text-gray-500 text-md">All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
