import React from "react";
import Banner from "../components/Home/banner/Banner";
import CoinTable from "../components/Home/coin-table/CoinTable";

const HomePage = () => {
  return (
    <div className="banner">
      <Banner />
      <CoinTable />
    </div>
  );
};

export default HomePage;
