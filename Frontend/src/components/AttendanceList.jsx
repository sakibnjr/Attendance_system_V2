import React, { useContext, useEffect } from "react";
import { FcVoicePresentation } from "react-icons/fc";
import { StudentContext } from "../contexts/StudentContext";
import { motion } from "framer-motion";

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
    <motion.div
      className="bg-base-200 rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header Section */}
      <motion.h2
        className="text-center text-3xl font-bold text-accent mb-4 border-b border-neutral-focus pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {dayName}, {currentDate} {monthName}
      </motion.h2>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center text-sm mb-4">{error}</p>
      )}

      {/* Attendance List */}
      {attendanceData.length === 0 ? (
        <motion.p
          className="text-center text-lg text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Classroom is empty!
        </motion.p>
      ) : (
        <motion.ul
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {attendanceData.map((record) => (
            <motion.li
              key={record.mac}
              className="flex items-center justify-between bg-base-300 rounded-md p-3 shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <FcVoicePresentation className="text-2xl" />
                <span className="font-semibold text-lg text-neutral-content">
                  {record.name}
                </span>
              </div>
              <span className="text-green-500 font-bold">Present</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default AttendanceList;
