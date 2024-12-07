import React, { useState, useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";
import toast from "react-hot-toast";
import { AiOutlineUser, AiOutlineIdcard, AiOutlineWifi } from "react-icons/ai";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [mac, setMac] = useState("");
  const { addStudent } = useContext(StudentContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !id || !mac) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addStudent({ name, id, mac });
      toast.success("Student added successfully");
      setName("");
      setId("");
      setMac("");
    } catch (error) {
      toast.error("Failed to add student");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Add Student
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Student Name"
          />
        </div>
        {/* ID Input */}
        <div className="relative">
          <AiOutlineIdcard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Student ID"
          />
        </div>
        {/* MAC Address Input */}
        <div className="relative">
          <AiOutlineWifi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="MAC Address"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
