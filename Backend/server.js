require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"));

const studentSchema = new mongoose.Schema({
  name: String,
  id: String,
  mac: String,
});

const attendanceSchema = new mongoose.Schema({
  mac: String,
  name: String,
  timestamp: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);

let validMacAddresses = {};

app.use(cors()); // Allow cross-origin requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load all valid MAC addresses from the database on startup
const loadValidMacAddresses = async () => {
  try {
    const students = await Student.find({});
    validMacAddresses = students.reduce((acc, student) => {
      acc[student.mac] = student.name;
      return acc;
    }, {});
    console.log("Loaded valid MAC addresses:", validMacAddresses);
  } catch (error) {
    console.error("Error loading students:", error);
  }
};

// Add new student
app.post("/add-student", async (req, res) => {
  const { name, id, mac } = req.body;

  const student = new Student({ name, id, mac });
  try {
    await student.save();
    validMacAddresses[mac] = name;
    res.status(201).send("Student added successfully");
  } catch (error) {
    res.status(500).send("Error adding student");
  }
});

// Handle MAC address scanning
app.post("/scan", async (req, res) => {
  const mac = req.body.mac;
  console.log(`Received MAC address: ${mac}`);

  if (validMacAddresses[mac]) {
    const name = validMacAddresses[mac];
    console.log(`Marked present: ${name}`);

    try {
      // Check if an attendance record for this MAC address already exists
      const existingRecord = await Attendance.findOne({ mac, name });

      if (!existingRecord) {
        // If no existing record, create a new one
        const attendanceRecord = new Attendance({ mac, name });
        await attendanceRecord.save();
      }

      res.send("MAC Address Received");
    } catch (error) {
      console.error("Error saving attendance record:", error);
      res.status(500).send("Error recording attendance");
    }
  } else {
    console.log(`MAC address ${mac} not recognized`);
    res.send("MAC Address not recognized");
  }
});

// Get attendance records
app.get("/attendance", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ timestamp: -1 });
    res.json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).send("Error fetching attendance records");
  }
});

// Fetch all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send("Error fetching students");
  }
});

// Update student information
app.put("/update-student/:id", async (req, res) => {
  const { id } = req.params;
  const { name, id: newId, mac: newMac } = req.body; // Ensure we get all required fields

  try {
    const student = await Student.findById(id);
    if (student) {
      const oldMac = student.mac;

      // Update student details
      student.name = name;
      student.id = newId; // Update student ID
      student.mac = newMac;
      await student.save();

      // Update validMacAddresses
      delete validMacAddresses[oldMac]; // Remove the old MAC
      validMacAddresses[newMac] = name; // Add the updated MAC

      res.send("Student updated successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send("Error updating student");
  }
});

// Delete a student
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Student.findByIdAndDelete(id);
    res.send("Student deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting student");
  }
});

// Delete all attendance records
app.delete("/attendance", async (req, res) => {
  try {
    await Attendance.deleteMany({});
    res.send("All attendance records deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting attendance records");
  }
});

app.listen(process.env.PORT, async () => {
  await loadValidMacAddresses();
  // Load valid MAC addresses on startup
  console.log(`Server running at ${process.env.PORT}`);
});
