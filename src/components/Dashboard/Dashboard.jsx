import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dashboard_img from "../../assets/login.jpeg";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-blue-600 text-white overflow-hidden">
      {/* Left Content */}
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="md:w-1/2 flex flex-col justify-center items-center p-10 text-center md:text-left"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
        >
          Discover Your <span className="text-yellow-300">Next Gadget</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-gray-100 max-w-md mb-10"
        >
          Explore our latest mobile devices and accessories designed for
          performance, elegance, and innovation — all in one place.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-xl hover:bg-gray-100 transition duration-300"
        >
          Get Started →
        </motion.button>
      </motion.div>

      {/* Right Side - Animated Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="md:w-1/2 flex items-center justify-center relative p-6"
      >
        {/* Floating image */}
        <motion.img
          src={dashboard_img}
          alt="Product Preview"
          className="w-3/4 md:w-2/3 rounded-3xl shadow-2xl border-4 border-white/20 object-cover"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glowing background blob */}
        <motion.div
          className="absolute w-72 h-72 bg-pink-400 blur-3xl rounded-full opacity-40"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;