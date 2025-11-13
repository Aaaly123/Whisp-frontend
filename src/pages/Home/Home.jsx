import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function Home() {
  const navigate = useNavigate();
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

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        {/* Subtle floating background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Where <span className="text-indigo-600">Honesty</span> <br /> Meets{" "}
            <span className="text-gray-800">Humor</span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg sm:text-xl max-w-2xl mx-auto">
            A fun, safe space to share your real thoughts — from genuine
            feedback to lighthearted roasts. <br className="hidden sm:block" />
            Speak freely. Stay anonymous.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {isUserLoggedIn ? (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/mywall")}
              >
                Go to My Wall
              </button>
            ) : (
              <>
                <button
                  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>

                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Small tagline */}
          <p className="text-gray-400 text-sm mt-6">
            No names. No filters. Just truth — the fun kind.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
