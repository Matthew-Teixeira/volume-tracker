import React from "react";
import { Link } from "react-router-dom";
import Tank from "../assets/images/tank2.svg";
import Auth from "../utils/auth";

const Home = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-indigo-50 px-4">
      <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
        <h1 className="text-center text-xl font-bold pt-4">
          Volumetric Tracker
        </h1>
        <img src={Tank} alt="plant" className="h-auto max-h-[200px] w-full" />
        <div className="p-5">
          <p className="text-medium mb-5 text-gray-700 text-center">
            This application contains data, which is contrived; therefore, not
            representative of real world conditions.
          </p>

          {!Auth.loggedIn() ? (
            <>
              <Link to={"/login"}>
                <button className="w-full rounded-md bg-[#337499]  py-2 text-indigo-100 hover:bg-[#4f90b6] hover:shadow-lg duration-75 text-lg">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <Link to={"/dashboard"}>
              <button className="w-full rounded-md bg-[#337499]  py-2 text-indigo-100 hover:bg-[#4f90b6] hover:shadow-lg duration-75 text-lg">
                Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
