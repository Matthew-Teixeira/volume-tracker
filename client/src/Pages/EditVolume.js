import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import loader from "../assets/images/loader.gif";

const EditVolume = () => {
  const [volumeId, setVolumeId] = useState("");
  const [voluemData, setVolumeData] = useState({});
  const [formData, setFormData] = useState({
    totalVol: "",
    waterVol: "",
    productVol: "",
  });
  const [updateFormData, setUpdateFormData] = useState({
    totalVol: "",
    waterVol: "",
    productVol: "",
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userLoggedIn = Auth.loggedIn();
  const userToken = Auth.getToken();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  const getVolumeId = () => {
    let path = window.location.pathname.split("/");
    let id = path[path.length - 1];
    setVolumeId(id);
  };

  useEffect(() => {
    getVolumeId();
    const getVolumeData = async (id) => {
      fetch(`http://localhost:5000/api/volumes/${id}`, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setVolumeData(data);
          setFormData({
            totalVol: data.totalVol,
            waterVol: data.waterVol,
            productVol: data.productVol,
          });
          setUpdateFormData({
            totalVol: data.totalVol,
            waterVol: data.waterVol,
            productVol: data.productVol,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (volumeId) {
      getVolumeData(volumeId);
      setLoading(false);
    }
  }, [volumeId, userToken]);

  useEffect(() => {
    if (voluemData) {
      console.log(voluemData);
    }
  }, [voluemData]);

  const updateVolume = async (totalVol, waterVol, productVol) => {
    fetch(`http://localhost:5000/api/volumes/${volumeId}`, {
      mode: "cors",
      method: "PUT",
      body: JSON.stringify({
        totalVol,
        waterVol,
        productVol,
      }),
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (event) => {
    setUpdateFormData({
      ...updateFormData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateVolume(updateFormData.totalVol, updateFormData.waterVol, updateFormData.productVol);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center">
          <img alt="loading" src={loader} />
        </div>
      ) : (
        <div
          name="volumes"
          className="min-h-[calc(100vh-64px)] flex justify-center items-center w-full"
        >
          <form onSubmit={onSubmit}>
            <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
              <div className="space-y-4">
                <h1 className="text-center text-2xl font-semibold text-gray-600 mt-8">
                  Edit Volume Data
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
                      defaultValue={formData.totalVol}
                      name="totalVol"
                      type="number"
                      step={0.01}
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      onChange={onChange}
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
                      defaultValue={formData.waterVol}
                      name="waterVol"
                      type="number"
                      step={0.01}
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      onChange={onChange}
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
                      defaultValue={formData.productVol}
                      name="productVol"
                      type="number"
                      step={0.01}
                      className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-[#33996b] text-indigo-100 hover:bg-[#4f90b6] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75"
              >
                Submit Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditVolume;
