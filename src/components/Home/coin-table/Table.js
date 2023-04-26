import React from "react";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../banner/Curousel";
import { CryptoState } from "../../Context";

const Table = ({ onHandleSearch }) => {
  const { symbol } = CryptoState();
  const navigate = useNavigate();

  return (
    <table className="w-full mx-auto mt-3">
      <thead className="bg-[#EEBC1D] h-[60px] rounded-t-lg">
        <tr>
          {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
            <td
              key={head}
              className={`text-black font-bold ${
                head === "Coin" ? "pl-5 sm:pl-10 md:pl-20" : ""
              }`}
            >
              {head}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {onHandleSearch().map((item) => {
          const profit = item.price_change_percentage_24h > 0;
          return (
            <tr
              className="bg-[#16171a] text-xs md:text-base cursor-pointer hover:bg-[#131111] "
              key={item.name}
              onClick={() => navigate(`/coins/${item.id}`)}
            >
              <td className="flex gap-4 ml-2 sm:ml-5 md:ml-10">
                <img
                  src={item?.image}
                  alt={item.name}
                  className="h-5 sm:h-8 md:h-14 md:m-3 my-3"
                />
                <div className="flex flex-col justify-center">
                  <span className="uppercase text-base sm:text-lg md:text-xl">
                    {item.symbol}
                  </span>
                  <span className="text-slate-600">{item.name}</span>
                </div>
              </td>
              <td className="text-sm">
                {symbol} {numberWithCommas(item.current_price.toFixed(3))}
              </td>
              <td
                className={`${
                  profit > 0 ? "text-green-700" : "text-red-600"
                } font-bold`}
              >
                {profit && "+"}
                {item.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>
                {symbol}{" "}
                {numberWithCommas(item.market_cap.toString().slice(0, -6))}M
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
