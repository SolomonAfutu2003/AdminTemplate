import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // clear any previous error

    const fakeAdmin = { id: 1, name: "John Doe", email: "admin@test" };
    const fakeUser = { id: 2, name: "Jane Smith", email: "user@test" };

    if (!email.trim()) {
      setError("❌ Input your email");
      return;
    }

    if (email === fakeAdmin.email) {
      login(fakeAdmin);
      navigate("/");
      return;
    }

    if (email === fakeUser.email) {
      login(fakeUser);
      navigate("/home");
      return;
    }

    setError("❌ Try again, invalid email");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 w-80"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : ""}`}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
