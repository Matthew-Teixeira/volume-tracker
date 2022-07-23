import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LineGraph from "../components/LineGraph";
import Auth from "../utils/auth";

const Charts = () => {
  const [tankData, setTankData] = useState(null);
  const [tankId, setTankId] = useState("");
  const [loading, setLoading] = useState(true);

  const [waterData, setWaterData] = useState({});

  const navigate = useNavigate();
  const userLoggedIn = Auth.loggedIn();
  const userToken = Auth.getToken();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  const getTankId = () => {
    let path = window.location.pathname.split("/");
    let id = path[path.length - 1];
    console.log(id);
    setTankId(id);
  };

  useEffect(() => {
    const fetchTankData = async (id) => {
      fetch(`/api/tanks/${id}`, {
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
          console.log(data);
          setTankData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTankId();

    if (tankId) {
      fetchTankData(tankId);
    }
  }, [tankId]);

  return (
    <div>
      {loading ? <div>Loading...</div> : <LineGraph tankData={tankData} />}
    </div>
  );
};

export default Charts;
