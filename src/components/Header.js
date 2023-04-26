import React from "react";
import { CryptoState } from "./Context";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Bitfinex-logo.png";

const Header = () => {
  const { currency, symbol, setCurrency } = CryptoState();
  const navigate = useNavigate();
  return (
    <header className="flex justify-evenly sm:justify-between items-center bg-gradient-to-r from-black via-black/60 to-black/40 backdrop-blur-md p-10 h-14 fixed w-full z-50 top-0">
      <div className="flex gap-4">
        <img src={Logo} className="h-12 object-cover" />
        <h1
          className=" text-[#fdd141] cursor-pointer text-2xl font-bold"
          onClick={() => navigate("/")}
        >
          BITFINEX
        </h1>
      </div>
      <select
        name=""
        id="demo-simple-select"
        className="bg-gray-600 px-1 py-1 rounded-md"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
      </select>
    </header>
  );
};

export default Header;
