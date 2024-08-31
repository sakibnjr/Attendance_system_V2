import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { FaRegIdBadge } from "react-icons/fa6";
import { FcAddressBook } from "react-icons/fc";

import HashLoader from "react-spinners/HashLoader";

const StudentList = ({ onDeleteSuccess, onStudentSelect, refresh, url }) => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    fetchStudents();
  }, [refresh]); // Re-fetch students when refresh state changes

  const fetchStudents = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(`${url}/students`);
      const data = await response.json();
      setStudents(data);
      setTotalStudents(data.length);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await fetch(`${url}/students/${studentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Student deleted successfully!");
        onDeleteSuccess(); // Notify parent to refresh list
      } else {
        alert("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdateClick = (student) => {
    onStudentSelect(student); // Notify parent to show update form
  };

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Students</div>
          <div className="stat-value">{totalStudents}</div>
          <div className="stat-desc">11% less than last month</div>
        </div>
      </div>

      <div className="stats shadow mx-4">
        <div className="stat">
          <div className="stat-title">Present</div>
          <div className="stat-value">{totalStudents}</div>
          <div className="stat-desc">11% less than last month</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Absent</div>
          <div className="stat-value">{totalStudents}</div>
          <div className="stat-desc">11% less than last month</div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <ul>
          {students.map((student) => (
            <li
              key={student._id}
              className="flex items-center justify-evenly my-2 border-2 shadow-md p-1 rounded-md"
            >
              <span className="flex items-center">
                <PiStudent />
                {student.name}
              </span>

              <span className="flex items-center">
                <FaRegIdBadge />
                {student.id}
              </span>

              <span className="flex items-center">
                <FcAddressBook />
                {student.mac}
              </span>

              <button
                onClick={() => handleUpdateClick(student)}
                className="btn btn-warning btn-sm"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => handleDelete(student._id)}
                className="btn btn-error btn-sm"
              >
                <MdDeleteForever />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
