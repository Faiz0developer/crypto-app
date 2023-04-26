import React, { useEffect, useState } from "react";
import { CoinList } from "../../configure/Api";
import { CryptoState } from "../../Context";
import axios from "axios";
import Table from "./Table";

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div className=" w-11/12 mx-auto">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Cryptocurrencies</h1>
        <div className="w-full mt-2">
          <input
            type="search"
            className="pl-2 border rounded-lg w-full py-2 mt-3 bg-black"
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <h1 className="animate-bounce  text-2xl text-center p-10">
          Loading...
        </h1>
      ) : (
        <Table onHandleSearch={handleSearch} />
      )}
    </div>
  );
};

export default CoinTable;
