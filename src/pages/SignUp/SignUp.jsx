import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// ✅ Yup validation schema
const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name cannot be empty")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  bio: yup
    .string()
    .trim()
    .max(200, "Bio cannot exceed 200 characters")
    .required("Bio cannot be empty"),
  password: yup
    .string()
    .trim()
    .required("Password cannot be empty")
    .min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, data);
      console.log("Response:", response.data);

      if (response.data && response.data.id) {
        alert("Account Created Successfully! You can now log in to Whisp!");
        navigate("/signin");
      } else {
        alert("Signup successful, but unexpected response received.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      if (error.response) {
        alert(
          error.response.data.message || "Error during sign-up, try again."
        );
      } else {
        alert("Network error, please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
        {/* Signup Card */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            Create Your Account ✨
          </h1>
          <p className="text-gray-400 text-center mb-8 text-sm">
            Join <span className="font-semibold text-indigo-400">Whisp</span>{" "}
            and start sharing your thoughts.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.name ? "border-red-500" : "border-gray-600"
                } focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <input
                type="text"
                {...register("bio")}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.bio ? "border-red-500" : "border-gray-600"
                } focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white`}
                placeholder="A short bio about yourself"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                } focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition duration-200 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Redirect to Sign In */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-indigo-400 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUp;
