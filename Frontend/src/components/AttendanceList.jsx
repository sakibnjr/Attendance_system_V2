// src/components/AttendanceList.jsx
import React, { useContext, useEffect } from "react";
import { FcVoicePresentation } from "react-icons/fc";
import { StudentContext } from "../contexts/StudentContext";

const AttendanceList = () => {
  const { attendanceData, fetchAttendance, error } = useContext(StudentContext);

  useEffect(() => {
    fetchAttendance();
    const intervalId = setInterval(fetchAttendance, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [fetchAttendance]);

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
