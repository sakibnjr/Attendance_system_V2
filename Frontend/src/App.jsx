// src/App.jsx
import { useState } from "react";

import React from "react";
import AttendanceList from "./components/AttendanceList";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import UpdateStudentForm from "./components/UpdateStudentForm";
import DeleteAttendanceButton from "./components/DeleteAttendanceButton";

const App = () => {
  const url = "https://sas-server-0g5o.onrender.com";
  //const url = "http://localhost:3000";

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleUpdateSuccess = () => {
    setSelectedStudent(null);
    setRefresh(!refresh);
  };

  const handleDeleteSuccess = () => {
    setRefresh(!refresh);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="App">
      <h1>IoT Attendance System</h1>
      <StudentList
        onStudentSelect={setSelectedStudent}
        refresh={refresh}
        onDeleteSuccess={handleDeleteSuccess}
        url={url}
      />
      {selectedStudent && (
        <UpdateStudentForm
          student={selectedStudent}
          onUpdateSuccess={handleUpdateSuccess}
          url={url}
        />
      )}
      <DeleteAttendanceButton onDeleteSuccess={handleDeleteSuccess} url={url} />
      <AttendanceList url={url} />
      <AddStudent url={url} />
    </div>
  );
};

export default App;
