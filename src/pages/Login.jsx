import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../variable";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { emailOrMobile, password } = formData;

    if (!emailOrMobile || !password) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post(baseUrl + "/auth/admin-login", {
        emailOrMobile,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      //   navigate("/");
      setTimeout(() => {
        location.href = "/";
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="emailOrMobile"
              className="block text-sm font-medium text-gray-900"
            >
              Mobile Number / Email
            </label>
            <div className="mt-2">
              <input
                id="emailOrMobile"
                name="emailOrMobile"
                type="text"
                required
                placeholder="Mobile Number / Email"
                value={formData.emailOrMobile}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                placeholder="Password"
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
