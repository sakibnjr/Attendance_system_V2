import React, { useState } from "react";
import StudentList from "../components/StudentList";
import UpdateStudentForm from "../components/UpdateStudentForm";
import AddStudent from "../components/AddStudent";
import ScannedNetwork from "../components/ScannedNetwork";
import EncryptedButton from "../components/EncryptedButton";
import { ScannedNetworkProvider } from "../contexts/ScannedNetworkContext";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DeleteAttendance from "../components/DeleteAttendanceButton";
import AttendanceManager from "../components/AttendanceManager";

const Admin = ({ url }) => {
  const [showNetworks, setShowNetworks] = useState(false);

  const toggleNetworkVisibility = () => {
    setShowNetworks((prev) => !prev);
  };

  return (
    <main className="w-full mx-auto">
      {/* Page Header */}
      <Navbar />
      <motion.div
        className="text-center py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-accent">Admin Dashboard</h1>
        <p className="text-black text-lg">
          Manage students, attendance, and scanned networks effortlessly.
        </p>
      </motion.div>

      {/* Main Content */}
      <section className="w-4/5 mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Section: Student List and Update Form */}
        <motion.div
          className="col-span-8 bg-base-200 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Student Management
          </h2>
          <StudentList />
          <UpdateStudentForm />
        </motion.div>

        {/* Right Section: Add Student */}
        <motion.div
          className="col-span-4 bg-base-200 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AddStudent />
          {/* <motion.div
            className="bg-base-200 rounded-lg shadow-md mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <DeleteAttendance />
          </motion.div> */}
        </motion.div>
      </section>

      <div className="my-4">
        <AttendanceManager />
      </div>

      {/* Network Scanning Section */}
      <section className="w-4/5 mx-auto mb-6">
        <ScannedNetworkProvider url={url}>
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              className="btn btn-accent btn-lg shadow-lg"
              onClick={toggleNetworkVisibility}
            >
              <EncryptedButton />
            </button>
          </motion.div>

          {showNetworks && (
            <motion.div
              className="mt-6 bg-base-300 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold text-secondary mb-4">
                Scanned Network Data
              </h2>
              <ScannedNetwork />
            </motion.div>
          )}
        </ScannedNetworkProvider>
      </section>
      <Footer />
    </main>
  );
};

export default Admin;
