import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const ref = useRef();

  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Auth.loggedIn()) {
      const user = Auth.getProfile();
      setUsername(user.data.username);
    }
  }, []);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-lg lg:text-xl font-bold text-[#337499]">
              <p>AppSolo</p>
              <p className="text-right">Tech.</p>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">

                {Auth.loggedIn() ? (
                  <>
                    <Link to={"/"}>
                      <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                        Home
                      </p>
                    </Link>
                    <Link to={"/dashboard"}>
                      <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                        Dashboard
                      </p>
                    </Link>
                    {/* <Link to={"/admin"}>
                      <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                        Admin
                      </p>
                    </Link> */}
                    <p
                      onClick={logout}
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                    >
                      Sign Out
                    </p>
                  </>
                ) : (
                  <Link to={"/"}>
                  <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </p>
                </Link>
                )}
              </div>
            </div>
          </div>
          {Auth.loggedIn() ? (
            <p className="font-medium text-white">{username} </p>
          ) : (
            <div className="hidden md:flex">
              <Link to={"/login"}>
                <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </p>
              </Link>
              <Link to={"/register"}>
                <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                  Register
                </p>
              </Link>
            </div>
          )}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {Auth.loggedIn() ? (
                <>
                  <Link to={"/"}>
                    <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                      Home
                    </p>
                  </Link>
                  <Link to={"/dashboard"}>
                    <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </p>
                  </Link>

                  <Link to={"/admin"}>
                    <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                      Admin
                    </p>
                  </Link>
                  <p
                    onClick={logout}
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Out
                  </p>
                </>
              ) : (
                <>
                  <Link to={"/login"}>
                    <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                      Login
                    </p>
                  </Link>
                  <Link to={"/register"}>
                    <p className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                      Register
                    </p>
                  </Link>
                </>
              )}
            </div>
          </div>
        }
      </Transition>
    </nav>
  );
};

export default Navbar;
