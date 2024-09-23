"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const HighChart = () => {
  const options = {
    chart: {
      type: "column",
      zoomType: "xy",
      backgroundColor: "rgba(0, 0, 0,0)",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "25 Nov",
        "2 Dec",
        "9 Dec",
        "18 Dec",
        "23 Dec",
        "30 Dec",
        "6 Jan",
        "13 Jan",
        "20 Jan",
        "27 Jan",
        "3 Feb",
        "10 Feb",
      ],
      min: 0,
      max: 11,
    },
    yAxis: {
      allowDecimals: false,
      title: { text: "hours <br/> Wh" },
      min: 0,
      max: 200000,
      tickInterval: 40000,
    },
    series: [
      {
        name: "Electricity Production(Wh)",
        data: [
          18430, 28042, 10063, 28684, 20445, 26564, 26690, 30453, 30916, 30376,
          30035, 42416,
        ],
        color: "red",
      },
      {
        name: "Gas Consumption(Wh)",
        data: [
          80690, 60453, 50916, 78376, 81035, 87416, 80430, 95042, 90363, 85984,
          83445, 180564,
        ],
        color: "orange",
      },
      {
        name: "Heat Production(Wh)",
        data: [
          35690, 40453, 25916, 50376, 42035, 38416, 26690, 26453, 43916, 42376,
          41035, 70416,
        ],
        color: "purple",
      },
    ],
  };

  return (
    <div className=" sm:h-[40%] sm:w-[40%]">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default HighChart;
