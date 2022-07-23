import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaGlobe, FaClipboardList, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Admin = () => {
  const navigate = useNavigate();
  const userLoggedIn = Auth.loggedIn();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  return (
    <div className="h-[calc(100vh-64px)]">
      <div className="flex justify-center items-center w-full">
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-lg text-[#599fc5] font-semibold tracking-wide uppercase">
                Admin Portal
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to manage.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <Link to="/admin/users">
                  <div className="relative hover:scale-105 duration-300 ease-in-out">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#337499] text-white">
                        {/* <!-- Heroicon name: outline/globe-alt --> */}
                        <FaGlobe size={30} />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Manage Access
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Manage authorization, modify user permissions to perform
                      certain tasks, and reset forgotten passwords.
                    </dd>
                  </div>
                </Link>

                <Link to="/admin/viewTanks">
                  <div className="relative hover:scale-105 duration-300 ease-in-out py-12 md:py-0">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#337499] text-white">
                        {/* <!-- Heroicon name: outline/scale --> */}
                        <FaClipboardList size={30} />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        Tank Updates
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Update existing tanks with new zone, tank name, or height
                      measurements. Remove tanks no longer in use.
                    </dd>
                  </div>
                </Link>

                <Link to="/admin/addTank">
                  <div className="relative hover:scale-105 duration-300 ease-in-out">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#337499] text-white">
                        {/* <!-- Heroicon name: outline/lightning-bolt --> */}
                        <FaBolt size={30} />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                        New Tanks
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      Add new tanks to your application by providing zone, tank
                      name, and expected measurement height.
                    </dd>
                  </div>
                </Link>

                <div
                  onClick={() =>
                    (window.location = "mailto:appsolo.tech@gmail.com")
                  }
                  className="relative hover:scale-105 duration-300 ease-in-out cursor-pointer"
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#337499] text-white">
                      {/* <!-- Heroicon name: outline/annotation --> */}
                      <FaEnvelope size={30} />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Contact Support
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Experiencing issues or ideas to improve the current
                    application. Please reach out through our support email
                    anytime.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
