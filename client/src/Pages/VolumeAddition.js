import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import FracTank from "../utils/volumeCalcs";
import Auth from "../utils/auth";

const VolumeAddition = () => {
  const navigate = useNavigate();
  const [tankId, setTankId] = useState("");
  const [tankData, setTankData] = useState({});
  const [loading, setLoading] = useState(true);
  const [volumeData, setVolumeData] = useState(null);
  const [calcFormData, setCalcFormData] = useState({
    dtp: 0,
    dtw: 0,
  });

  const userLoggedIn = Auth.loggedIn();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

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

  const onCalcChange = (event) => {
    setCalcFormData({
      ...calcFormData,
      [event.target.name]: event.target.value,
    });
  };

  const onCalc = (event) => {
    event.preventDefault();
    const frac1A = new FracTank(tankData.height);
    const volumes = frac1A.allVolumes(
      parseFloat(calcFormData.dtp),
      parseFloat(calcFormData.dtw)
    );
    setVolumeData(volumes);
  };

  useEffect(() => {
    getTankId();
  }, [tankId]);

  const postVolumes = async (totalVol, waterVol, productVol, id) => {
    fetch(`http://localhost:5000/api/volumes/addVolume/${id}`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        totalVol,
        waterVol,
        productVol,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.assign(`/volumes/${tankId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitVolumes = (event) => {
    event.preventDefault();
    postVolumes(
      volumeData.totalVol,
      volumeData.waterVol,
      volumeData.productVol,
      tankId
    );
  };

  return (
    <>
      <div className="h-[calc(100vh-64px)] flex justify-center items-center w-full">
        {loading ? (
          <div className="text-4xl text-center mt-4">Loading...</div>
        ) : (
          <form onSubmit={onCalc}>
            <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
              <h2 className="inline text-xl font-bold">
                Tank:{" "}
                {tankData.tankName.slice(0, 1) +
                  tankData.tankName[1].toUpperCase()}
              </h2>
              <p className="inline float-right text-xl font-bold">
                Zone: {tankData.zone}
              </p>
              <div className="space-y-4">
                <h1 className="text-center text-2xl font-semibold text-gray-600 mt-8">
                  Add Measurements
                </h1>
                <div>
                  <div className="flex text-center">
                    <div className="mr-8">
                      <label
                        htmlFor="dtp"
                        className="block mb-1 text-gray-600 font-semibold"
                      >
                        DTP
                      </label>
                      <input
                        onChange={onCalcChange}
                        name="dtp"
                        type="number"
                        step={0.01}
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="dtw"
                        className="block mb-1 text-gray-600 font-semibold"
                      >
                        DTW
                      </label>
                      <input
                        onChange={onCalcChange}
                        name="dtw"
                        type="number"
                        step={0.01}
                        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-[#337499] text-indigo-100 hover:bg-[#4f90b6] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75"
              >
                Calculate
              </button>

              {!volumeData ? (
                false
              ) : (
                <Link
                  className="mt-4 w-full block bg-[#33996b] text-white hover:bg-[#4f90b6] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75 text-center"
                  to="volumes"
                  smooth={true}
                  duration={500}
                >
                  View Volumes
                </Link>
              )}
            </div>
          </form>
        )}
      </div>

      {!volumeData ? (
        false
      ) : (
        <div
          name="volumes"
          className="h-screen flex justify-center items-center w-full"
        >
          <form onSubmit={submitVolumes}>
            <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
              <h2 className="inline text-xl font-bold">
                Tank:{" "}
                {tankData.tankName.slice(0, 1) +
                  tankData.tankName[1].toUpperCase()}
              </h2>
              <p className="inline float-right text-xl font-bold">
                Zone: {tankData.zone}
              </p>
              <div className="space-y-4">
                <h1 className="text-center text-2xl font-semibold text-gray-600 mt-8">
                  Calculated Volumes
                </h1>
                <div>
                  <div>
                    <label
                      htmlFor="totalVol"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Total
                    </label>
                    <input
                      name="totalVol"
                      type="number"
                      step={0.01}
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      value={volumeData.totalVol}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="waterVol"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Water
                    </label>
                    <input
                      name="waterVol"
                      type="number"
                      step={0.01}
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      value={volumeData.waterVol}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="productVol"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Product
                    </label>
                    <input
                      name="productVol"
                      type="number"
                      step={0.01}
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      value={volumeData.productVol}
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-[#33996b] text-indigo-100 hover:bg-[#4f90b6] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75"
              >
                Submit Volumes
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default VolumeAddition;
