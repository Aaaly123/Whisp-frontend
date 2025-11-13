import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import ReceivedFeedback from "../../components/ReceivedFeedback/ReceivedFeedback";
import Footer from "../../components/Footer/Footer";
const API_URL = import.meta.env.VITE_BACKEND_URL;

function MyWall() {
  const [user, setUser] = useState(null);
  const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);

  const token = localStorage.getItem("token");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  };

  useEffect(() => {
    if (token && !isTokenExpired(token)) {
      setIsUserLoggedIn(true);

      // Fetch user profile
      axios
        .get(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching profile:", err));

      // Fetch feedbacks
      axios
        .get(`${API_URL}/api/feedbacks/my-wall`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setReceivedFeedbacks(res.data))
        .catch((err) => console.error("Error fetching feedbacks:", err));
    } else {
      localStorage.removeItem("token");
      setIsUserLoggedIn(false);
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="mt-36 px-4 sm:px-8 md:px-16 max-w-4xl mx-auto mb-20">
        {isUserLoggedIn ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Welcome, {user?.name}! 👋
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Here’s what people are saying about you <br /> real, raw, and
              anonymous.
            </p>

            <h1 className="text-center text-4xl font-extrabold mb-10 text-gray-800">
              My Wall 💬
            </h1>

            {receivedFeedbacks.length > 0 ? (
              <div className="space-y-6">
                {receivedFeedbacks.map((feedback) => (
                  <ReceivedFeedback
                    key={feedback.id}
                    receivedFeedback={feedback}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-10">
                No feedback received yet. Share your feedback link to get
                started!
              </p>
            )}
          </>
        ) : (
          <h1 className="text-center text-red-600 font-semibold text-lg mt-20">
            Session expired. Please sign in again.
          </h1>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyWall;
