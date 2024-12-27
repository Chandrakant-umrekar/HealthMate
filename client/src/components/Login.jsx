import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setShowLogin, setToken, backendUrl, setUser } = useApp();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/patients/login`, {
          email: formData.email,
          password: formData.password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.data);
          setShowLogin(false);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.data);
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/patients/register`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );
        console.log(data);

        if (data.success) {
          setUser(data.data);
          setToken(data.token);
          setShowLogin(false);
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.data);
        } else {
          toast.error("Registration failed");
        }
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-8 sm:p-10 md:p-12 lg:p-14 rounded-xl text-slate-500 max-w-sm w-full"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-2">
          {state}
        </h1>
        <p className="text-sm text-center mb-4">
          Welcome back! Please {state} to continue
        </p>

        {state !== "Login" && (
          <div className="border px-5 py-2 flex items-center gap-2 rounded-lg mt-5">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-none outline-none p-2 w-full"
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-lg mt-5">
          <input
            placeholder="Email"
            className="border-none outline-none p-2 w-full"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-lg mt-5">
          <input
            placeholder="Password"
            className="border-none outline-none p-2 w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer text-center">
          Forgot password?
        </p>

        <button
          type="submit"
          className="bg-blue-600 w-full font-medium tracking-wide text-white py-2.5 text-base mb-1 rounded-md"
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}

        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-5 right-5 cursor-pointer text-3xl hover:rotate-90 duration-300 text-gray-500"
        >
          &times;
        </button>
      </motion.form>
    </div>
  );
}

export default Login;
