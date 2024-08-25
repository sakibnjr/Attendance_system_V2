// src/components/AttendanceList.jsx

import React, { useEffect, useState } from "react";

const AttendanceList = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:3000/attendance");
      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data);
        console.log(data);
      } else {
        console.error("Failed to fetch attendance data");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance(); // Initial fetch
    const intervalId = setInterval(fetchAttendance, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        margin: 0,
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#343a40" }}>Attendance</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {attendanceData.map((record) => (
          <li
            key={record.mac}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #dee2e6",
              margin: "5px 0",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {record.name} (MAC: {record.mac}) - Present
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
