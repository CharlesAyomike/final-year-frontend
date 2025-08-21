import { useState } from "react";
import { Sms } from "iconsax-reactjs";
import ai from "../assets/AI-no-bg.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 font-sans p-4">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-gray-900 to-gray-900 z-0"></div>
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>

      {/* Forgot Password Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl shadow-cyan-500/10 px-4 sm:px-8 py-8 z-10 border border-gray-700/50">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gray-700/50 rounded-full mb-4 border border-cyan-500/20">
            <img src={ai} className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-white">
            Forgot Password?
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <Sms
              size="20"
              color={isFocused ? "#22d3ee" : "#9ca3af"}
              variant="Linear"
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 placeholder-gray-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm sm:text-base">
            Remember your password?{" "}
            <a
              href="/"
              className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
