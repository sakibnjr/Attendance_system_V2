// src/components/DeleteAttendanceButton.jsx
import React, { useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";

const DeleteAttendanceButton = () => {
  const { deleteAllAttendance } = useContext(StudentContext);

  const handleDelete = async () => {
    try {
      await deleteAllAttendance();
      alert("All attendance records deleted successfully!");
    } catch (error) {
      alert("Failed to delete attendance records.");
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-outline btn-error">
      Delete All Records
    </button>
  );
};

export default DeleteAttendanceButton;
