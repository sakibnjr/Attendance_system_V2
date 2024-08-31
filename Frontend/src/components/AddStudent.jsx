import React, { useState, useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";
import toast from "react-hot-toast";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [mac, setMac] = useState("");
  const { addStudent } = useContext(StudentContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !id || !mac) {
      toast.error("All fields are required");
      return;
    }

    try {
      await addStudent({ name, id, mac });
      toast.success("Student added successfully");
      setName("");
      setId("");
      setMac("");
    } catch (error) {
      toast.error("Failed to add student");
    }
  };

  return (
    <div>
      <h2 className="border-2 px-4 text-center text-2xl my-2 rounded-md">
        Add Student
      </h2>
      <form
        onSubmit={handleSubmit}
        className="form-control grid grid-cols-1 gap-2"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered"
          placeholder="Student Name"
        />
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input input-bordered"
          placeholder="Student ID"
        />
        <input
          type="text"
          value={mac}
          onChange={(e) => setMac(e.target.value)}
          className="input input-bordered"
          placeholder="MAC Address"
        />
        <button type="submit" className="btn btn-outline w-full">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
