import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignOutBtn from "../SignOutBtn/SignOutBtn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isTokenExpired = (token) => {
    if (!token) return true;

    try {
      const base64Payload = token.split(".")[1];
      if (!base64Payload) return true;

      const payload = JSON.parse(atob(base64Payload));
      return Date.now() > payload.exp * 1000;
    } catch (error) {
      console.warn("Invalid token:", error);
      return true;
    }
  };

  let isUserLoggedIn = false;
  if (token && !isTokenExpired(token)) {
    isUserLoggedIn = true;
  } else {
    localStorage.removeItem("token");
  }

  const handleSignIn = () => navigate("/signin");
  const handleSignUp = () => navigate("/signup");

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/10 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            Whisp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-200 hover:text-indigo-400 transition-colors duration-300"
            >
              Home
            </Link>

            {isUserLoggedIn ? (
              <>
                <Link
                  to="/mywall"
                  className="text-gray-200 hover:text-indigo-400 transition"
                >
                  My Wall
                </Link>
                <Link
                  to="/writtenfeedbacks"
                  className="text-gray-200 hover:text-indigo-400 transition"
                >
                  Written
                </Link>
                <Link
                  to="/writefeedback"
                  className="text-gray-200 hover:text-indigo-400 transition"
                >
                  Write
                </Link>
                <Link
                  to="/myprofile"
                  className="text-gray-200 hover:text-indigo-400 transition"
                >
                  Profile
                </Link>
                <SignOutBtn />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-indigo-400/50 text-indigo-300 hover:bg-indigo-500/20 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Hamburger for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-200 hover:text-indigo-400 transition"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-xl border-t border-gray-700/50 text-gray-200 py-4 px-6 space-y-3 transition-all duration-300">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-indigo-400"
          >
            Home
          </Link>

          {isUserLoggedIn ? (
            <>
              <Link
                to="/mywall"
                onClick={() => setIsOpen(false)}
                className="block hover:text-indigo-400"
              >
                My Wall
              </Link>
              <Link
                to="/writtenfeedbacks"
                onClick={() => setIsOpen(false)}
                className="block hover:text-indigo-400"
              >
                Written
              </Link>
              <Link
                to="/writefeedback"
                onClick={() => setIsOpen(false)}
                className="block hover:text-indigo-400"
              >
                Write
              </Link>
              <Link
                to="/myprofile"
                onClick={() => setIsOpen(false)}
                className="block hover:text-indigo-400"
              >
                Profile
              </Link>
              <div className="pt-2">
                <SignOutBtn />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  handleSignIn();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg bg-gray-800/60 hover:bg-gray-700 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  handleSignUp();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
