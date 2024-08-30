import React, { useState } from "react";

const UpdateStudentForm = ({ student, onUpdateSuccess, url }) => {
  const [name, setName] = useState(student.name);
  const [id, setId] = useState(student.id);
  const [mac, setMac] = useState(student.mac);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${url}/update-student/${student._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, id, mac }),
      });

      if (response.ok) {
        alert("Student updated successfully!");
        onUpdateSuccess(); // Notify parent to refresh list
      } else {
        alert("Failed to update student.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div>
      <h3>Update Student</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="MAC"
        value={mac}
        onChange={(e) => setMac(e.target.value)}
      />
      <button onClick={handleUpdate} className="btn btn-info">
        Update
      </button>
    </div>
  );
};

export default UpdateStudentForm;
