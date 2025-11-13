import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import WrittenFeedback from "../../components/WrittenFeedback/WrittenFeedback";
import Footer from "../../components/Footer/Footer";
const API_URL = import.meta.env.VITE_BACKEND_URL;

function WrittenFeedbacks() {
  const [writtenFeedbacks, setWrittenFeedbacks] = useState([]);
  const token = localStorage.getItem("token");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // --- Check Token Expiry ---
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000;
      return Date.now() > expiry;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      setIsUserLoggedIn(false);
      return;
    }
    setIsUserLoggedIn(true);

    axios
      .get(`${API_URL}/api/feedbacks/my-written`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWrittenFeedbacks(res.data))
      .catch((err) => console.error("Error fetching written feedbacks:", err));
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="mt-24 mx-4 sm:mx-10">
        {isUserLoggedIn ? (
          <>
            <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Written Feedbacks
            </h1>

            {writtenFeedbacks.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                You haven’t written any feedbacks yet.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {writtenFeedbacks.map((writtenFeedback) => (
                  <WrittenFeedback
                    key={writtenFeedback.id}
                    writtenFeedback={writtenFeedback}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-20">
            <h1 className="text-red-600 text-xl font-semibold">
              Session Expired. Please sign in again.
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default WrittenFeedbacks;
