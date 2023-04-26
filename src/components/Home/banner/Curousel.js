import React, { useEffect, useState } from "react";
import { CryptoState } from "../../Context";
import axios from "axios";
import { TrendingCoins } from "../../configure/Api";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Curousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        className="flex flex-col items-center cursor-pointer uppercase text-white"
        to={`/coins/${coin.id}`}
      >
        <img src={coin?.image} alt={coin.name} className="h-20 mb-3" />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            className={`${
              profit > 0 ? "text-green-600" : "text-red-800"
            } font-bold`}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="text-2xl font-medium">
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 1,
    },
    400: {
      items: 2,
    },
    648: {
      items: 3,
    },
    850: {
      items: 4,
    },
  };

  return (
    <div className="flex items-center h-1/2">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Curousel;
