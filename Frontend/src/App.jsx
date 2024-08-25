// src/App.jsx

import React from "react";
import AttendanceList from "./components/AttendanceList";
import AddStudent from "./components/AddStudent";

const App = () => {
  return (
    <div className="App">
      <AttendanceList />
      <AddStudent />
    </div>
  );
};

export default App;
