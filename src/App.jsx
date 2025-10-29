import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login&Signup/Login";
import Signup from "./components/Login&Signup/signup";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar/Navbar";
import PhoneLogin from "./components/Login&Signup/PhoneLogin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load login state
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") setIsLoggedIn(true);
  }, []);

  // Save login state
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      {/* Navbar visible on all pages */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/phone-login" element={<PhoneLogin />} />

        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
