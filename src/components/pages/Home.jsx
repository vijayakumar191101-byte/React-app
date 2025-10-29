import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center p-8"
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-100 mb-6">
          You’re now logged in! Explore your products and account details here.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Explore Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
