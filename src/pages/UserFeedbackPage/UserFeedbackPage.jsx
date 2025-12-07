import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// ✅ Fixed Yup schema for safe regex
const feedbackSchema = yup.object().shape({
  someone_text: yup
    .string()
    .trim()
    .matches(/^[\-a-zA-Z0-9\s.,'!]*$/, "Invalid characters detected") // '-' moved to start
    .required("This field is required"),
  feedback_text: yup
    .string()
    .trim()
    .matches(/^[\-a-zA-Z0-9\s.,'!?]*$/, "Invalid characters detected") // '-' moved to start
    .required("Feedback message is required"),
});

const UserFeedbackPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(feedbackSchema),
  });

  // Token expiration check
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() > payload.exp * 1000;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      setIsUserLoggedIn(false);
      localStorage.removeItem("token");
      return;
    }

    axios
      .get(`${API_URL}/api/users/receiver/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [id, token]);

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${API_URL}/api/feedbacks/write`,
        { receiverId: id, ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      reset();
      alert("Feedback submitted successfully!");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-24 mx-4 sm:mx-10">
        {loading ? (
          <div className="text-center mt-20 text-gray-400 animate-pulse">
            Loading user details...
          </div>
        ) : !isUserLoggedIn ? (
          <div className="text-center mt-20 text-red-600 font-semibold">
            Session expired. Please sign in again.
          </div>
        ) : user ? (
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-lg border border-white/10 p-8 text-white backdrop-blur-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                Send Feedback To
              </h1>
              <h2 className="text-2xl font-bold mt-2 text-indigo-300">
                {user.name}
              </h2>
              <p className="text-gray-400 mt-3 italic">
                {user.bio || "No bio provided."}
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 bg-white/10 p-6 rounded-xl border border-white/20 shadow-md"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Someone From
                </label>
                <input
                  type="text"
                  {...register("someone_text")}
                  placeholder="e.g., FAST Karachi, Office, School"
                  className={`w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 ${
                    errors.someone_text ? "border-red-500" : "border-gray-500"
                  }`}
                />
                {errors.someone_text && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.someone_text.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Feedback Message
                </label>
                <textarea
                  {...register("feedback_text")}
                  rows="5"
                  placeholder="Write your honest thoughts here..."
                  className={`w-full px-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 resize-none ${
                    errors.feedback_text ? "border-red-500" : "border-gray-500"
                  }`}
                ></textarea>
                {errors.feedback_text && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.feedback_text.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:opacity-90 transition duration-200"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center mt-20 text-gray-400">
            User not found or unavailable.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserFeedbackPage;
