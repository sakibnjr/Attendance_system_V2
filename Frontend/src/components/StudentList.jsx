import React, { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { PiStudent } from "react-icons/pi";
import { FaRegIdBadge } from "react-icons/fa6";
import { FcAddressBook } from "react-icons/fc";
import ScaleLoader from "react-spinners/ScaleLoader";
import { StudentContext } from "../contexts/StudentContext";
import toast from "react-hot-toast";

const StudentList = () => {
  const {
    students,
    deleteStudent,
    setSelectedStudent,
    loading,
    totalStudent,
    presentStudent,
    absentStudent,
  } = useContext(StudentContext);

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Students</div>
          <div className="stat-value">{totalStudent}</div>
          <div className="stat-desc">11% less than last month</div>
        </div>
      </div>

      <div className="stats shadow mx-4">
        <div className="stat">
          <div className="stat-title">Present</div>
          <div className="stat-value">{presentStudent}</div>
          <div className="stat-desc">11% less than last month</div>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Absent</div>
          <div className="stat-value">{absentStudent}</div>
          <div className="stat-desc">11% less than last month</div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-2">
          <ScaleLoader color="#36d7b7" />
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
