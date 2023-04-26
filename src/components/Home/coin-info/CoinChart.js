import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../../Context";
import { chartDays } from "../../configure/data";
import { HistoricalChart } from "../../configure/Api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
import Button from "./Button";

ChartJS.register(
  LineController,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Title
);

const CoinChart = ({ id, coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [loading, setLoading] = useState(false);

  const fetchHistoryChartData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setHistoricData(data.prices);
    setLoading(false);
  };

  const chartTimeAndDate = historicData.map((coin) => {
    let dateAndTime = new Date(coin[0]);
    let date = `${dateAndTime.getDate()}`;
    let year = dateAndTime.getFullYear();
    const month = dateAndTime.toLocaleString("en-US", { month: "short" });
    let time =
      dateAndTime.getHours() > 12
        ? `${dateAndTime.getHours() - 12}:${dateAndTime.getMinutes()} PM`
        : `${dateAndTime.getHours()}:${dateAndTime.getMinutes()} AM`;
    return days === 1 ? time : `${date} ${month} ${year}`;
  });

  useEffect(() => {
    fetchHistoryChartData();
  }, [currency, days]);
  return (
    <>
      {loading ? (
        <>
          <div className="animate-ping bg-blue-300 border-2 rounded-full h-10 w-10 ml-72 mt-40"></div>
        </>
      ) : (
        <div className="md:w-3/4 w-full p-4">
          <Line
            data={{
              labels: chartTimeAndDate,

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
              responsive: true,
            }}
          />
          <div className="flex gap-5 md:gap-14 mt-6">
            {chartDays.map((day) => {
              return (
                <Button
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default CoinChart;
