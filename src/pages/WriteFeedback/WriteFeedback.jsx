import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import UserForFeedback from "../../components/UserForFeedback/UserForFeedback";
import Footer from "../../components/Footer/Footer";
const API_URL = import.meta.env.VITE_BACKEND_URL;

function WriteFeedback() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const token = localStorage.getItem("token");

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() > payload.exp * 1000;
    } catch {
      return true;
    }
  };

  if (!token || isTokenExpired(token)) {
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      const res = await axios.get(
        `${API_URL}/api/users/receiver/name/${name}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-24 mx-4 sm:mx-10">
        {isUserLoggedIn ? (
          <>
            <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-10 bg-gradient-to-r from-indigo-400 to-pink-500 text-transparent bg-clip-text">
              Write Feedback
            </h1>

            {/* Search Form */}
            <form
              className="max-w-md mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20"
              onSubmit={handleSubmit}
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Enter Name:
              </label>
              <input
                className="w-full px-4 py-2 mb-4 border border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white placeholder-gray-400"
                type="text"
                value={name}
                placeholder="Search user by name..."
                onChange={(e) => setName(e.target.value)}
              />
              <button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200"
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Search Results */}
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users.length > 0 ? (
                users.map((user) => (
                  <UserForFeedback key={user.id} user={user} />
                ))
              ) : (
                <p className="text-center text-gray-400 mt-8">
                  {name
                    ? "No users found with that name."
                    : "Search for a user to give feedback."}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center mt-20">
            <h1 className="text-red-600 text-xl font-semibold">
              Session expired. Please sign in again.
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default WriteFeedback;
