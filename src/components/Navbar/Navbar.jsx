import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out from Firebase
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      toast.success("Logged out successfully 👋");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className="text-2xl font-bold text-purple-600">
            MyStore
          </Link>
        </motion.div>

        {/* Nav Links */}
        <div className="space-x-6 flex items-center">
          {isLoggedIn && (
            <motion.div whileHover={{ y: -3 }}>
              <Link
                to="/home"
                className="text-gray-700 hover:text-purple-600 transition font-medium"
              >
                Home
              </Link>
            </motion.div>
          )}

          {!isLoggedIn ? (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Login
              </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
