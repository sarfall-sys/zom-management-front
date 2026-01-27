import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { FaEye } from "react-icons/fa";
import { PiEyeClosed } from "react-icons/pi";
import Loader from "../components/common/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
function Login() {
  const { login, loading, error, user } = useAuthContext();

  useEffect(() => {
    if (user) {
    <Navigate to="/dashboard" replace />;
    }
  }, [user]);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      await login(formData);
    } catch {}
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 border rounded-xl bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark"
        >
          <h1 className="mb-6 text-2xl font-bold text-text-light dark:text-text-dark">
            Login
          </h1>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">
              Email:
            </label>
            <input
              onChange={handleInputChange}
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 bg-white border rounded-lg dark:bg-slate-800 text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
              value={formData.email}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password:
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                required
                className="w-full p-2 bg-white border rounded-lg dark:bg-slate-800 text-text-light dark:text-text-dark border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 right-2 hover:text-gray-700"
              >
                {showPassword ? <PiEyeClosed /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white transition rounded-lg bg-primary-light dark:bg-primary-dark hover:opacity-90"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error.response?.status === 422 && "Invalid credentials"}
              {error.response?.status === 429 &&
                "Too many attempts. Try later."}
              {error.response?.status === 500 && "Server error. Try again."}
            </p>
          )}
        </form>
      </section>
    </>
  );
}

export default Login;
