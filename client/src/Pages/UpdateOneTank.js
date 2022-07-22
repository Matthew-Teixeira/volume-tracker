import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const UpdateOneTank = () => {
  const [tankName, setTankName] = useState("");
  const [tankId, setTankId] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    zone: "",
    tankName: "",
    height: 0,
  });

  const navigate = useNavigate();
  const userLoggedIn = Auth.loggedIn();
  const userToken = Auth.getToken()

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    const location = window.location.pathname;
    let tank = location.split("/")[3];
    let id = location.split("/")[4];
    setTankName(tank);
    setTankId(id);
    setLoading(false);
  }, []);

  const updateTank = async (zone, tankName, height) => {
    await fetch(`/api/tanks/updateTank/${tankId}`, {
      mode: "cors",
      method: "PUT",
      body: JSON.stringify({
        zone,
        tankName,
        height: parseFloat(height),
      }),
      headers: {
        'Authorization': `Bearer ${userToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateTank(formData.zone, formData.tankName, formData.height);
  };

  const removeTank = async () => {
    await fetch(`/api/tanks/deleteTank/${tankId}`, {
      mode: "cors",
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${userToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteTank = async (event) => {
    event.preventDefault();
    await removeTank();
  }

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center w-full">
      {loading ? (
        <div className="text-lg">Loading</div>
      ) : (
        <div
          name="volumes"
          className="h-screen flex justify-center items-center w-full"
        >
          <form onSubmit={onSubmit}>
            <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
              <div className="space-y-4">
                <h1 className="text-center text-2xl font-semibold text-gray-600 mt-8">
                  Update: {tankName.slice(0, 1) + tankName[1].toUpperCase()}
                </h1>
                <div>
                  <div>
                    <label
                      htmlFor="zone"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Zone
                    </label>
                    <input
                      onChange={onChange}
                      name="zone"
                      type="text"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="tankName"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Tank Name
                    </label>
                    <input
                      onChange={onChange}
                      name="tankName"
                      type="text"
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="height"
                      className="block mb-1 text-gray-600 font-semibold"
                    >
                      Height -feet base 10-
                    </label>
                    <input
                      onChange={onChange}
                      name="height"
                      type="number"
                      step={0.01}
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                <button
                  type="submit"
                  className="mt-4 mr-4 w-full bg-[#33996b] text-indigo-100 hover:bg-[#4f90b6] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75"
                >
                  Update Tank
                </button>
                <button
                  onClick={deleteTank}
                  className="mt-4 w-full bg-[#d94c4c] text-indigo-100 hover:bg-[#f65e4d] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75"
                >
                  Delete Tank
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateOneTank;
