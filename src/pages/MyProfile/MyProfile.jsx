import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { IoCopy } from "react-icons/io5";
import Footer from "../../components/Footer/Footer";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const FRONTEND_URL = "https://whisp-sigma.vercel.app";

function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [copied, setCopied] = useState(false); // for copy message
  let isUserLoggedIn;

  const token = localStorage.getItem("token");

  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  };

  if (token) {
    if (isTokenExpired(token)) {
      isUserLoggedIn = false;
      localStorage.removeItem("token");
    } else {
      isUserLoggedIn = true;
    }
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching profile details: ", error);
      });
  }, []);

  const handleSubmitBio = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/api/users/update-bio`,
        { bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Bio updated successfully!");
      navigate(0);
    } catch (error) {
      console.error("Error updating bio", error);
      alert("Error updating bio. Try again.");
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/api/users/update-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated successfully!");
      navigate(0);
    } catch (error) {
      console.error("Error updating password", error);
      alert("Error updating password. Try again.");
    }
  };

  const handleCopy = () => {
    const link = `${FRONTEND_URL}/writefeedback/${user?.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="mt-36 px-6 sm:px-10 max-w-2xl mx-auto">
        {isUserLoggedIn ? (
          <>
            <h1 className="text-center text-4xl font-bold mb-10 text-gray-900">
              My Profile
            </h1>

            {/* Share Link Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Share your Feedback Link
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Share this link on your social handles to get feedback:
              </p>

              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg text-gray-700 text-sm">
                <span className="truncate">
                  {FRONTEND_URL}/writefeedback/{user?.id}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-indigo-600 hover:text-indigo-800 ml-3"
                  title="Copy to clipboard"
                >
                  <IoCopy size={20} />
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  Link copied to clipboard!
                </p>
              )}
            </div>

            {/* User Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                My Details
              </h3>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Name:</span> {user?.name}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Bio:</span> {user?.bio}
              </p>
            </div>

            {/* Update Bio */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Update Bio
              </h4>
              <form onSubmit={handleSubmitBio} className="space-y-4">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                  placeholder="Enter new bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <button
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                  type="submit"
                >
                  Update Bio
                </button>
              </form>
            </div>

            {/* Update Password */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-20">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Update Password
              </h4>
              <form onSubmit={handleSubmitPassword} className="space-y-4">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  type="password"
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                  type="submit"
                >
                  Update Password
                </button>
              </form>
            </div>
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

export default MyProfile;
