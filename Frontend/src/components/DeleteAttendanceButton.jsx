import React from "react";

const DeleteAttendanceButton = ({ onDeleteSuccess, url }) => {
  const deleteAttendance = async () => {
    try {
      const response = await fetch(`${url}/attendance`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("All attendance records deleted successfully!");
        onDeleteSuccess(); // Notify parent to refresh UI
      } else {
        alert("Failed to delete attendance records.");
      }
    } catch (error) {
      console.error("Error deleting attendance records:", error);
    }
  };

  return (
    <button onClick={deleteAttendance} className="btn btn-outline btn-error">
      Delete All Records
    </button>
  );
};

export default DeleteAttendanceButton;
