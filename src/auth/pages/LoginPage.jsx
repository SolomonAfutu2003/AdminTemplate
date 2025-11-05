// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "../../API/axiosClient";
import { BASE_URL } from "../../constant"; // or use your constants.js setup

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("❌ All fields are required");
      setLoading(false);
      return;
    }

    try {
      // ✅ Use axiosClient instead of fetch
      const res = await axiosClient.post(`/auth/login`, { email, password });

      // Expected response: { token, user }
      const { token, user } = res.data;

      if (!token || !user) throw new Error("Invalid response from server");

      // ✅ Call AuthContext’s login handler
      await login({ user, token });

      navigate("/blog_dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100">
      {/* Left image */}
      <section className="w-[30%] bg-blue-600">
        <div className="h-screen">
          <img src="/el.png" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Right form */}
      <section className="w-[70%] h-screen bg-white flex justify-center items-center">
        <form onSubmit={handleLogin} className="w-[40%] space-y-3">
          <h2 className="text-xl font-bold text-center">Login</h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-500" : ""
            }`}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-500" : ""
            }`}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded w-full transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
