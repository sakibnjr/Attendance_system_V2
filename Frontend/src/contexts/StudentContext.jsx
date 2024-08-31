// src/contexts/StudentContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children, url }) => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, [url]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch(`${url}/attendance`);
      if (response.ok) {
        const data = await response.json();
        setAttendanceData(data);
        setError(null);
      } else {
        throw new Error("Failed to fetch attendance data");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching attendance:", error);
    }
  };

  const addStudent = async (newStudent) => {
    try {
      const response = await fetch(`${url}/add-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        fetchStudents(); // Refresh students list
      } else {
        throw new Error("Failed to add student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const updateStudent = async (student) => {
    try {
      const response = await fetch(`${url}/update-student/${student._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        await fetchStudents(); // Refresh student list
        setSelectedStudent(null); // Deselect the student
      } else {
        throw new Error("Failed to update student");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(`${url}/students/${studentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchStudents(); // Refresh students list
      } else {
        throw new Error("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const deleteAllAttendance = async () => {
    try {
      const response = await fetch(`${url}/attendance`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAttendanceData([]); // Clear attendance data
      } else {
        throw new Error("Failed to delete attendance records.");
      }
    } catch (error) {
      console.error("Error deleting attendance records:", error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        attendanceData,
        fetchAttendance,
        selectedStudent,
        setSelectedStudent,
        addStudent,
        updateStudent,
        deleteStudent,
        deleteAllAttendance,
        error,
        loading,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
