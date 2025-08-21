import React, { useState } from "react";
import { Sms, Lock1, Eye, EyeSlash, User } from "iconsax-reactjs";
import { ToastContainer } from "react-toastify";
import { useCreateUserMutation } from "../api/auth/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ai from "../assets/AI-no-bg.png";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useCreateUserMutation();
  const token = useSelector((state) => state.auth.token);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    mutate(userData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (field) =>
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) =>
    setIsFocused((prev) => ({ ...prev, [field]: false }));

  if (token) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 font-sans p-4">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-gray-900 to-gray-900 z-0"></div>
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>

      {/* Sign Up Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl shadow-cyan-500/10 px-4 sm:px-8 py-8 z-10 border border-gray-700/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gray-700/50 rounded-full mb-4 border border-cyan-500/20">
            <img src={ai} className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-white">
            Create an Account
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Sign up to get started with your AI assistant.
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <User
              size="20"
              color={isFocused.name ? "#22d3ee" : "#9ca3af"}
              variant="Linear"
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 placeholder-gray-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Sms
              size="20"
              color={isFocused.email ? "#22d3ee" : "#9ca3af"}
              variant="Linear"
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 placeholder-gray-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock1
              size="20"
              color={isFocused.password ? "#22d3ee" : "#9ca3af"}
              variant="Linear"
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 placeholder-gray-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {showPassword ? <EyeSlash size="20" /> : <Eye size="20" />}
            </button>
          </div>

          {/* Submit */}
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm sm:text-base">
            Already have an account?{" "}
            <a
              href="/"
              className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
