import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { IoCopy } from "react-icons/io5";
import Footer from "../../components/Footer/Footer";
import * as Yup from "yup";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const FRONTEND_URL = "https://whisp-sigma.vercel.app";

function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [bioError, setBioError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem("token");
  let isUserLoggedIn;

  // JWT Expiry Check
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

  // Validation Schemas
  const bioSchema = Yup.string()
    .min(3, "Bio must be at least 3 characters")
    .max(200, "Bio cannot exceed 200 characters");

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .notOneOf([Yup.ref("oldPassword")], "New password must be different"),
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((error) => console.error("Error fetching profile: ", error));
  }, []);

  // Update Bio
  const handleSubmitBio = async (e) => {
    e.preventDefault();
    setBioError("");

    try {
      await bioSchema.validate(bio);
      await axios.put(
        `${API_URL}/api/users/update-bio`,
        { bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Bio updated successfully!");
      navigate(0);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setBioError(error.message);
      } else {
        alert("Error updating bio. Try again.");
      }
    }
  };

  // Update Password
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setPasswordError("");

    try {
      await passwordSchema.validate({ oldPassword, newPassword });

      await axios.put(
        `${API_URL}/api/users/update-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Password updated successfully!");
      navigate(0);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setPasswordError(error.message);
      } else {
        alert("Error updating password. Try again.");
      }
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

              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg text-gray-700 text-sm">
                <span className="truncate">
                  {FRONTEND_URL}/writefeedback/{user?.id}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-indigo-600 hover:text-indigo-800 ml-3"
                >
                  <IoCopy size={20} />
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  Link copied!
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
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    bioError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter new bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                {bioError && <p className="text-red-600 text-sm">{bioError}</p>}

                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
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
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                {passwordError && (
                  <p className="text-red-600 text-sm">{passwordError}</p>
                )}

                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
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
