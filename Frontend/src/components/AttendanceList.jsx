import React, { useEffect, useState } from "react";
const AttendanceList = ({ url }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`${url}/attendance`);
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
    <div>
      <h2 className="border-2 px-4 text-center text-2xl">
        Saturday <span>10 August</span>
      </h2>
      <div className="flex gap-2 justify-center">
        <p className=" bg-emerald-500 text-white p-4 rounded-md">Present : X</p>
        <p className=" bg-rose-500  text-white p-4 rounded-md">Absent : Y</p>
      </div>

      <ul className="border-2 rounded-md shadow-md p-2">
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
