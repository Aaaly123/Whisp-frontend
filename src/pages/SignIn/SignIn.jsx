import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/signin`, {
        email,
        password,
      });

      console.log("Response:", response.data);

      localStorage.setItem("token", response.data.token);
      alert(response.data.message);

      if (response.data.message === "Login Successful!") {
        navigate("/mywall");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
        {/* Sign-in Card */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            Welcome Back 👋
          </h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Sign in to continue to{" "}
            <span className="font-semibold text-indigo-400">Whisp</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition duration-200 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-400 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignIn;
