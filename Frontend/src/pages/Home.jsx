import React from "react";
import AttendanceList from "../components/AttendanceList";
import DeleteAttendanceButton from "../components/DeleteAttendanceButton";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div data-theme="cyberpunk" className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="hero bg-base-200 py-10 px-4">
        <motion.div
          className="hero-content text-center flex flex-col"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-accent flex items-center justify-center gap-3">
            <FaUserCircle />
            Welcome to CyberAttendance
          </h1>
          <p className="mt-4 text-base md:text-lg text-black">
            Smart attendance system that automatically scans devices and marks
            attendance.
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full md:w-4/5 mx-auto py-10 px-4">
        <motion.section
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Attendance List */}
          <motion.div
            className="w-full max-w-md md:max-w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <AttendanceList />
          </motion.div>

          {/* Delete Attendance Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <DeleteAttendanceButton />
          </motion.div>

          {/* Toaster for Notifications */}
          <Toaster />
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
