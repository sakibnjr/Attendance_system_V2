import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { FaRegIdBadge } from "react-icons/fa6";
import { FcAddressBook } from "react-icons/fc";

const StudentList = ({ onDeleteSuccess, onStudentSelect, refresh, url }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, [refresh]); // Re-fetch students when refresh state changes

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${url}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
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
      <h2>Total Students : X</h2>
      <ul className="border-2 rounded-md shadow-md p-2">
        {students.map((student) => (
          <li
            key={student._id}
            className="flex items-center justify-evenly bg-slate-100 my-2"
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
    </div>
  );
};

export default StudentList;
