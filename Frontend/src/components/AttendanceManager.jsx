import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const AttendanceManager = () => {
  const [students, setStudents] = useState([]);
  const [mac, setMac] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch attendance records
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/attendance");
        setStudents(response.data);
      } catch (err) {
        console.error("Error fetching attendance records:", err);
        toast.error("Failed to fetch attendance records.");
      }
    };
    fetchAttendance();
  }, []);

  // Handle form submission
  const handleAttendance = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/attendance", {
        mac,
        name,
        status: "Present",
      });
      setStudents((prev) => [{ mac, name, timestamp: new Date() }, ...prev]);
      setMac("");
      setName("");
      toast.success("Attendance marked successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark attendance.");
    }
    setLoading(false);
  };

  // Delete all records
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all records?")) return;

    try {
      await axios.delete("http://localhost:3000/attendance");
      setStudents([]);
      toast.success("All records deleted!");
    } catch (err) {
      console.error("Error deleting records:", err);
      toast.error("Failed to delete records.");
    }
  };

  return (
    <div className="w-4/5 mx-auto p-6 bg-gradient-to-br from-black via-gray-800 to-black text-white min-h-screen rounded-xl shadow-lg">
      <Toaster />
      <motion.h1
        className="text-4xl font-extrabold text-center text-pink-500 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Attendance Manager
      </motion.h1>

      {/* Attendance Form */}
      <motion.div
        className="mb-6 p-6 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-green-400">
          Mark Attendance
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-pink-400">MAC Address</label>
          <input
            type="text"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            className="w-full bg-gray-800 border border-pink-500 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-pink-400">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 border border-pink-500 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAttendance}
            className={`flex-1 px-4 py-2 bg-green-500 text-black font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <AiOutlineCheck />
            Mark Present
          </button>
          <button
            onClick={handleDeleteAll}
            className="flex-1 px-4 py-2 bg-red-500 text-black font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            <AiOutlineDelete />
            Delete All Records
          </button>
        </div>
      </motion.div>

      {/* Attendance Records */}
      <motion.div
        className="p-6 bg-gradient-to-r from-gray-900 via-black to-gray-900 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-green-400">
          Attendance Records
        </h2>
        {students.length > 0 ? (
          <table className="w-full border-collapse border border-gray-700 text-white">
            <thead>
              <tr>
                <th className="border border-gray-700 px-4 py-2">MAC</th>
                <th className="border border-gray-700 px-4 py-2">Name</th>
                <th className="border border-gray-700 px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-800"
                >
                  <td className="border border-gray-700 px-4 py-2">
                    {student.mac}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {student.name}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    {new Date(student.timestamp).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-pink-400">No attendance records found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default AttendanceManager;
