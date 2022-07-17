import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VolumeTable from "../components/VolumeTable";

const Volumes = () => {
  const [tankId, setTankId] = useState("");
  const [tankData, setTankData] = useState({});
  const [loading, setLoading] = useState(true);

  const getTankId = () => {
    let path = window.location.pathname.split("/");
    let id = path[path.length - 1];
    setTankId(id);
  };

  useEffect(() => {
    getTankId();
    const getTankData = async (id) => {
      fetch(`http://localhost:5000/api/tanks/${id}`, {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setTankData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (tankId) {
      getTankData(tankId);
    }
  }, [tankId]);

  return (
    <div className="min-h-[calc(100vh-64px)] h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to={`/addVolume/${tankData._id}`}>
            <button className="w-full block mx-auto max-w-[300px] rounded-md bg-[#337499]  py-2 text-indigo-100 hover:bg-[#4f90b6] hover:shadow-lg duration-75 text-lg my-4">
              Add Volume
            </button>
          </Link>
      {loading ? (
        <div className="text-4xl text-center mt-4">Loading...</div>
      ) : (
        <div className="overflow-x-auto container flex md:justify-center mx-auto">
          <div className="flex flex-col">
              <div className="border-b border-gray-200 shadow">
              <h3 className='text-center text-xl font-bold'>{tankData.tankName.slice(0, 1) + tankData.tankName[1].toUpperCase()}</h3>
    <table className="divide-y divide-gray-300 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">Date</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Time</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Total</th>
                    <th className="px-6 py-2 text-xs text-gray-500">PCW</th>
                    <th className="px-6 py-2 text-xs text-gray-500">LNAPL</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Edit</th>
                  </tr>
                </thead>
                {tankData.volumes.map((volume) => (
                  <VolumeTable key={volume._id} volumeData={volume} tankData={tankData} />
                ))}
                </table>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Volumes;
