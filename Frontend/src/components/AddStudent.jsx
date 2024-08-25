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
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Add Student</h2>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="id" style={{ display: "block", marginBottom: "5px" }}>
            ID:
          </label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="mac"
            style={{ display: "block", marginBottom: "5px" }}
          >
            MAC Address:
          </label>
          <input
            id="mac"
            type="text"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Add Student
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddStudent;
