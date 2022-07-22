import React, { useState } from "react";
import Auth from "../utils/auth"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = async (username, email, password, confirmPassword) => {
    fetch("/api/user/register", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        Auth.login(data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    registerUser(formData.username, formData.email, formData.password, formData.confirmPassword);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center w-full">
      <form onSubmit={onSubmit}>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
          <div className="space-y-4">
            <h1 className="text-center text-2xl font-semibold text-gray-600">
              Register
            </h1>
            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Username
              </label>
              <input
              onChange={onChange}
                name="username"
                type="text"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Email
              </label>
              <input
              onChange={onChange}
                name="email"
                type="email"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Password
              </label>
              <input
              onChange={onChange}
                name="password"
                type="password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-gray-600 font-semibold"
              >
                Confirm Password
              </label>
              <input
              onChange={onChange}
                name="confirmPassword"
                type="password"
                className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-[#337499] text-indigo-100 hover:bg-[#4f90b6] py-2 rounded-md text-lg tracking-wide hover:shadow-lg duration-75"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
