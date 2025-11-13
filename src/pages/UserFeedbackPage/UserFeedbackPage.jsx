import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const UserFeedbackPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [someone_text, setSomeone_text] = useState("");
  const [feedback_text, setFeedback_text] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback_text.trim()) {
      alert("Please enter feedback before submitting!");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/feedbacks/write`,
        { receiverId: id, someone_text, feedback_text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSomeone_text("");
      setFeedback_text("");
      alert("Feedback submitted successfully!");
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mt-24 mx-4 sm:mx-10">
        {/* Loading State */}
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
            {/* User Info */}
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

            {/* Feedback Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 bg-white/10 p-6 rounded-xl border border-white/20 shadow-md"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Someone From
                </label>
                <input
                  type="text"
                  value={someone_text}
                  onChange={(e) => setSomeone_text(e.target.value)}
                  placeholder="e.g., FAST Karachi, Office, School"
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Feedback Message
                </label>
                <textarea
                  value={feedback_text}
                  onChange={(e) => setFeedback_text(e.target.value)}
                  rows="5"
                  placeholder="Write your honest thoughts here..."
                  className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 resize-none"
                ></textarea>
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
