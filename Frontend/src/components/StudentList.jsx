import React, { useEffect, useState } from "react";
//import UpdateStudentForm from "./UpdateStudentForm";

const StudentList = ({ onDeleteSuccess, onStudentSelect, refresh, url }) => {
  const [students, setStudents] = useState([]);
  //const [selectedStudent, setSelectedStudent] = useState(null);

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
    // setSelectedStudent(student);
    onStudentSelect(student); // Notify parent to show update form
  };

  return (
    <div>
      <h2>Registered Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} (ID: {student.id}, MAC: {student.mac})
            <button
              onClick={() => handleUpdateClick(student)}
              className="btn btn-info"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(student._id)}
              className="btn btn-error"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* {selectedStudent && (
        <UpdateStudentForm
          student={selectedStudent}
          onUpdateSuccess={onDeleteSuccess}
        />
      )} */}
    </div>
  );
};

export default StudentList;
