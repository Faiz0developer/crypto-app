import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../../Context";
import { SingleCoin } from "../../configure/Api";
import { numberWithCommas } from "../banner/Curousel";
import CoinChart from "./CoinChart";

const CoinInfo = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState(false);

  const ftchCoinData = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    ftchCoinData();
  }, [currency]);

  return (
    <div className="flex flex-col-reverse md:flex-row w-3/4 md:w-[95%] mx-auto mt-20 py-4">
      <div className="md:w-1/3 mt-10 md:mt-0 p-2">
        {loading ? (
          <div className=" p-4 max-w-sm w-full mt-10">
            <div className="animate-pulse flex flex-col space-x-4 gap-10">
              <div className="rounded-full bg-slate-700 h-40 w-40"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <img
              src={coin?.image.large}
              alt={coin?.name}
              className="h-20 md:h-40 mb-5"
            />
            <h1 className="text-4xl font-medium ">{coin?.name}</h1>
            <p className="mt-2 text-amber-500">
              {coin?.description.en.split(". ")[0]}.
            </p>
            <div className="mt-2">
              <span className="font-medium text-xl">
                Rank:{" "}
                <span className="text-slate-400 font-normal">
                  {" "}
                  {coin?.market_cap_rank}
                </span>
              </span>
            </div>
            <div className="mt-2">
              <span className="font-medium text-xl">
                Current Price:{" "}
                <span className="text-slate-400 font-normal">
                  {symbol}
                  {numberWithCommas(
                    +coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </span>
              </span>
            </div>
            <div className="mt-2">
              <span className="font-medium text-xl">
                Market Cap:{"  "}
                <span className="text-slate-400 font-normal">
                  {symbol}
                  {numberWithCommas(
                    +coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
                  M
                </span>
              </span>
            </div>
          </>
        )}
      </div>

      <div className="border" />
      <CoinChart id={id} coin={coin} />
    </div>
  );
};

export default CoinInfo;
