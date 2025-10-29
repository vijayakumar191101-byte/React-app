import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react"; // 👁 for show/hide
import login_img from "../../assets/login.jpeg";

import { auth, googleProvider, facebookProvider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🧠 Password strength checker
  const checkPasswordStrength = (pass) => {
    if (!pass) return "";
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const medium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (strong.test(pass)) return "strong";
    if (medium.test(pass)) return "medium";
    return "weak";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      toast.error("No account found. Please sign up first.");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      toast.success("Login successful 🎉");
      setTimeout(() => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      }, 1500);
    } else {
      toast.error("Invalid email or password");
    }
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

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      toast.success(`Welcome, ${user.displayName}! 🎉`);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
        })
      );
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      toast.success(`Welcome, ${user.displayName}! 🎉`);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
        })
      );
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={login_img}
            alt="Mobile Store"
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
            Welcome Back!
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 max-w-md mx-auto"
          >
            To stay connected with us, please login with your personal info.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex items-center justify-center bg-white p-8 md:p-12 relative shadow-inner"
      >
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-2xl font-light"
        >
          ✕
        </button>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign In</h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
              />

              {/* Eye toggle */}
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

              <p className="text-right text-sm text-pink-500 mt-2 cursor-pointer hover:underline">
                Forgot password?
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-2.5 rounded-lg transition-transform transform hover:scale-[1.02] shadow-md"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center my-4">
              <span className="h-px w-1/3 bg-gray-300"></span>
              <span className="mx-3 text-sm text-gray-400">or</span>
              <span className="h-px w-1/3 bg-gray-300"></span>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                <span className="text-gray-600">Google</span>
              </button>

              <button
                type="button"
                onClick={handleFacebookLogin}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                <span className="text-gray-600">Facebook</span>
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-600 mt-5">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-pink-500 font-semibold cursor-pointer hover:underline"
              >
                Create free account
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;