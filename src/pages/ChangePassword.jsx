import { useState } from "react";
import { Lock1, Eye, EyeSlash } from "iconsax-reactjs";
import ai from "../assets/AI-no-bg.png";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (field) =>
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) =>
    setIsFocused((prev) => ({ ...prev, [field]: false }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Perform password update logic
    console.log("Updating password to:", newPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 font-sans p-4">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 via-gray-900 to-gray-900 z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-4000" />

      {/* Change Password Card */}
      <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 z-10 border border-gray-700/50">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gray-700/50 rounded-full mb-4 border border-cyan-500/20">
            <img src={ai} className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-wider text-white">
            Change Password
          </h1>
          <p className="text-gray-400 mt-2">
            Enter a new password for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div className="relative">
            <Lock1
              size="20"
              color={isFocused.newPassword ? "#22d3ee" : "#9ca3af"}
              variant="Linear"
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onFocus={() => handleFocus("newPassword")}
              onBlur={() => handleBlur("newPassword")}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 placeholder-gray-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock1
              size="20"
              color={isFocused.confirmPassword ? "#22d3ee" : "#9ca3af"}
              variant="Linear"
              className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={() => handleBlur("confirmPassword")}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
