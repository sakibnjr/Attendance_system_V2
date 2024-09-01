// src/App.jsx
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import AttendanceList from "./components/AttendanceList";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import UpdateStudentForm from "./components/UpdateStudentForm";
import DeleteAttendanceButton from "./components/DeleteAttendanceButton";
import Header from "./components/Header";
import ScannedNetwork from "./components/ScannedNetwork";
import { ScannedNetworkProvider } from "./contexts/ScannedNetworkContext";
import { StudentProvider } from "./contexts/StudentContext";
import EncryptedButton from "./components/EncryptedButton";

const App = () => {
  const url = "https://sas-server-0g5o.onrender.com";
  //const url = "http://localhost:3000";

  const [showNetworks, setShowNetworks] = useState(false);
  function showNetwork() {
    setShowNetworks((net) => !net);
  }

  return (
    <StudentProvider url={url}>
      <main className="w-4/5 mx-auto">
        <Header />
        <div className="flex flex-col lg:grid lg:grid-cols-11 gap-4 items-center">
          <section className="col-span-3 flex flex-col">
            <AttendanceList />
            <DeleteAttendanceButton />
            <Toaster />
          </section>
          <section className="col-span-6 flex flex-col">
            <StudentList />
            <UpdateStudentForm />
          </section>
          <section className="col-span-2">
            <AddStudent />
          </section>
        </div>
        <ScannedNetworkProvider url={url}>
          <div className="flex justify-center mt-4">
            <button onClick={showNetwork}>
              <EncryptedButton />
            </button>
          </div>
          {showNetworks && <ScannedNetwork />}
        </ScannedNetworkProvider>
      </main>
    </StudentProvider>
  );
};

export default App;
