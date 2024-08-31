// src/components/UpdateStudentForm.jsx
import React, { useState, useContext, useEffect } from "react";
import { StudentContext } from "../contexts/StudentContext";

const UpdateStudentForm = () => {
  const { selectedStudent, updateStudent, setSelectedStudent } =
    useContext(StudentContext);
  const [name, setName] = useState(selectedStudent?.name || "");
  const [id, setId] = useState(selectedStudent?.id || "");
  const [mac, setMac] = useState(selectedStudent?.mac || "");

  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name);
      setId(selectedStudent.id);
      setMac(selectedStudent.mac);
    }
  }, [selectedStudent]);

  const handleUpdate = async () => {
    if (selectedStudent) {
      try {
        await updateStudent({ ...selectedStudent, name, id, mac });
      } catch (error) {
        console.error("Error updating student:", error);
      }
    }
  };

  if (!selectedStudent) return null; // Don't render if no student is selected

  return (
    <div>
      <h3 className="bg-warning text-white px-2 rounded-md my-2">
        Update Student
      </h3>
      <div className="grid grid-cols-4 gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="MAC"
          value={mac}
          onChange={(e) => setMac(e.target.value)}
          className="input input-bordered"
        />
        <button onClick={handleUpdate} className="btn btn-info">
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateStudentForm;
