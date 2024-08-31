import React, { useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";
import toast from "react-hot-toast";

const DeleteAttendanceButton = () => {
  const { deleteAllAttendance } = useContext(StudentContext);

  const handleDelete = async () => {
    try {
      await deleteAllAttendance();
      toast.success("All attendance records deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete attendance records.");
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-outline btn-error">
      Delete All Records
    </button>
  );
};

export default DeleteAttendanceButton;
