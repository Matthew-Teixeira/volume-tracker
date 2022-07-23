import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { date, time } from "../utils/time-date";

const LineGraph = ({ tankData }) => {
  const [loading, setLoading] = useState(true);
  const [volumeData, setVolumeData] = useState(tankData.volumes.slice(tankData.volumes.length-50, tankData.volumes.length))
  const [waterData, setWaterData] = useState({
  });

  useEffect(() => {
    if (tankData) {
      setWaterData({
        labels: volumeData.map((volume) => date(volume.created_at) + " - " + time(volume.created_at)),
        datasets: [
          {
            label: "Water",
            data: volumeData.map((volume) => volume.waterVol),
            backgroundColor: [
              "rgba(75,192,192,1)",
            ],
            borderColor: "blue",
            borderWidth: 1,
          },
          {
            label: "Product",
            data: volumeData.map((volume) => volume.productVol),
            backgroundColor: [
              "rgba(200,19,92,1)",
            ],
            borderColor: "red",
            borderWidth: 1,
          },
          {
            label: "Total",
            data: volumeData.map((volume) => volume.totalVol),
            backgroundColor: [
              "rgba(20,19,92,1)",
            ],
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      });

      setLoading(false);
      console.log(tankData.volumes);
    }
  }, [loading, tankData]);
  return (
    <div className="flex justify-evenly items-center flex-wrap min-h-[calc(100vh-64px)] h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {loading ? (
        <div>Loading Again...</div>
      ) : (
        <div className="w-[3000px]">
          <Line data={waterData} />
        </div>
      )}
    </div>
  );
};

export default LineGraph;
