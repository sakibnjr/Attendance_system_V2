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
    <div className="border-2 rounded-md shadow-md p-2">
      <h1 className="text-xl">Present Students</h1>
      <ul>
        {attendanceData.map((record) => (
          <li key={record.mac} className="mb-2">
            {record.name} (MAC: {record.mac}) - Present
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
