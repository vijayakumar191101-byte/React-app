import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react"; // 👁 show/hide icons
import signup_img from "../../assets/login.jpeg";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") checkPasswordStrength(value);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Password Strength Check
  const checkPasswordStrength = (pass) => {
    if (!pass) {
      setPasswordStrength("");
      return;
    }

    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const medium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (strong.test(pass)) setPasswordStrength("strong");
    else if (medium.test(pass)) setPasswordStrength("medium");
    else setPasswordStrength("weak");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordStrength === "weak") {
      toast.error("Password too weak! Add uppercase, number & symbol.");
      return;
    }

    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      toast.error("User already exists! Please log in.");
      return;
    }

    // Save new user in localStorage
    localStorage.setItem("user", JSON.stringify({ name, email, password }));

    toast.success("Account created successfully 🎉");
    setTimeout(() => navigate("/login"), 1500);
  };

  const strengthColor = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    strong: "bg-green-500",
  };

  const strengthText = {
    weak: "Weak Password",
    medium: "Moderate Password",
    strong: "Strong Password",
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Left Side (Image) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={signup_img}
            alt="Signup"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-8">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg"
          >
            Create Your Account
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 max-w-md mx-auto"
          >
            Join us today and start your journey with our platform!
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side (Form) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex items-center justify-center bg-white p-8 md:p-12 relative shadow-inner"
      >
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-2xl font-light"
        >
          ✕
        </button>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign Up</h2>
          <p className="text-gray-500 mb-6">
            Fill in your details to create a new account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              {/* Password strength meter */}
              {password && (
                <div className="mt-2">
                  <div
                    className={`h-2 rounded-full ${strengthColor[passwordStrength]} transition-all`}
                  ></div>
                  <p
                    className={`text-sm mt-1 ${
                      passwordStrength === "weak"
                        ? "text-red-500"
                        : passwordStrength === "medium"
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {strengthText[passwordStrength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2.5 rounded-lg transition-transform transform hover:scale-[1.02] shadow-md"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600 mt-5">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-pink-500 font-semibold cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
