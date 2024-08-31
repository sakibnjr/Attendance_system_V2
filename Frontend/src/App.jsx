// src/App.jsx
import { useState } from "react";

import React from "react";
import AttendanceList from "./components/AttendanceList";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import UpdateStudentForm from "./components/UpdateStudentForm";
import DeleteAttendanceButton from "./components/DeleteAttendanceButton";
import Header from "./components/Header";
import ScannedNetworkList from "./components/ScannedNetworkList";

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
    <main className="w-4/5 mx-auto">
      <Header />
      <div className="flex flex-col lg:grid lg:grid-cols-10 gap-4 items-center">
        <section className="col-span-3 flex flex-col">
          <AttendanceList url={url} />
          <DeleteAttendanceButton
            onDeleteSuccess={handleDeleteSuccess}
            url={url}
          />
        </section>
        <section className="col-span-5 flex flex-col">
          <StudentList
            onStudentSelect={handleStudentSelect}
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
        </section>

        <section className="col-span-2">
          <AddStudent url={url} />
        </section>
      </div>
      <ScannedNetworkList url={url} />
    </main>
  );
};

export default App;
