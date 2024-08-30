import React, { useEffect, useState } from "react";
import { FcVoicePresentation } from "react-icons/fc";

const AttendanceList = ({ url }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState(null);

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`${url}/attendance`);
      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data);
        setError(null); // Reset error on successful fetch
      } else {
        throw new Error("Failed to fetch attendance data");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance(); // Initial fetch
    const intervalId = setInterval(fetchAttendance, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [url]); // Added url to dependency array

  const today = new Date();
  const currentDay = today.getDay();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = weekdays[currentDay];
  const monthName = months[currentMonth];

  return (
    <div>
      <h2 className="border-2 px-4 text-center text-2xl rounded-md">
        {dayName} {currentDate} {monthName}
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {attendanceData.length === 0 ? (
        <p className="text-center my-2">No students are present!</p>
      ) : (
        <ul className="border-2 rounded-md shadow-md p-2 my-2">
          {attendanceData.map((record) => (
            <li key={record.mac} className="mb-2 flex items-center">
              {record.name} <span className="text-green-500 mx-2">Present</span>{" "}
              <FcVoicePresentation />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceList;
