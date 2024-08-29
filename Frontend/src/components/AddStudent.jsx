// src/components/AddStudent.jsx

import React, { useState } from "react";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [mac, setMac] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !id || !mac) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, id, mac }),
      });

      if (response.ok) {
        setSuccess("Student added successfully");
        setName("");
        setId("");
        setMac("");
      } else {
        setError("Failed to add student");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 border-2 rounded-md shadow-md p-2">
      <h2 className="text-xl">Add Student</h2>
      <form
        onSubmit={handleSubmit}
        className="form-control grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-2"
      >
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered"
          placeholder="Student Name"
        />

        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input input-bordered"
          placeholder="Student ID"
        />

        <input
          id="mac"
          type="text"
          value={mac}
          onChange={(e) => setMac(e.target.value)}
          className="input input-bordered"
          placeholder="MAC Address"
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Student
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddStudent;
