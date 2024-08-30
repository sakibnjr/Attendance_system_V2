import React from "react";

const DeleteStudentButton = ({ studentId, onDeleteSuccess, url }) => {
  const deleteStudent = async () => {
    try {
      const response = await fetch(`${url}/students/${studentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Student deleted successfully!");
        onDeleteSuccess();
      } else {
        alert("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return <button onClick={deleteStudent}>Delete</button>;
};

export default DeleteStudentButton;
