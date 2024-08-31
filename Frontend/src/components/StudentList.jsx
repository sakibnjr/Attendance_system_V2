// src/components/StudentList.jsx
import React, { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { FaRegIdBadge } from "react-icons/fa6";
import { FcAddressBook } from "react-icons/fc";
import HashLoader from "react-spinners/HashLoader";
import { StudentContext } from "../contexts/StudentContext";

const StudentList = () => {
  const { students, deleteStudent, setSelectedStudent, loading } =
    useContext(StudentContext);

  const handleDelete = (studentId) => {
    deleteStudent(studentId);
  };

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Students</div>
          <div className="stat-value">50</div>
          <div className="stat-desc">11% less than last month</div>
        </div>
      </div>

      <div className="stats shadow mx-4">
        <div className="stat">
          <div className="stat-title">Present</div>
          <div className="stat-value">50</div>
          <div className="stat-desc">11% less than last month</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Absent</div>
          <div className="stat-value">50</div>
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
