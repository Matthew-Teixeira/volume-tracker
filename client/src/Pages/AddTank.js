import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const AddTank = () => {
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

  const postNewTank = async (zone, tankName, height) => {
    await fetch("/api/tanks/addTank", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        zone,
        tankName,
        height: parseFloat(height)
      }),
      headers: {
        'Authorization': `Bearer ${userToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/dashboard")
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
    postNewTank(formData.zone, formData.tankName, formData.height);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center w-full">
      <div
        name="volumes"
        className="h-screen flex justify-center items-center w-full"
      >
        <form onSubmit={onSubmit}>
          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-semibold text-gray-600 mt-8">
                Add Tank
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
            <button
              type="submit"
              className="mt-4 w-full bg-[#33996b] text-indigo-100 hover:bg-[#4f90b6] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75"
            >
              Add Tank
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTank;
