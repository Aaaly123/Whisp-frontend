// Footer.jsx
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900">Whisp</h2>
          <p className="text-sm mt-2 text-gray-600 max-w-xs">
            Where honesty meets humor. A space to share real thoughts — from
            serious suggestions to meme-level roasts. 100% anonymous, always
            real.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-gray-900 mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:text-gray-900 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/signin" className="hover:text-gray-900 transition">
                Sign In
              </a>
            </li>
            <li>
              <a href="/signup" className="hover:text-gray-900 transition">
                Sign Up
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-900 transition">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-gray-900 mb-2">Connect</h3>
          <a
            href="https://www.linkedin.com/in/aliyan-ahmed-naqvi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-2 hover:text-blue-700 transition"
          >
            <FaLinkedin className="text-xl" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Whisp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
