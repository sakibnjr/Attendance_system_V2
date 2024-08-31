// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and model definitions

// Student Schema and Model
const studentSchema = new mongoose.Schema({
  name: String,
  id: String,
  mac: String,
});

const Student = mongoose.model("Student", studentSchema);

// Attendance Schema and Model
const attendanceSchema = new mongoose.Schema({
  mac: String,
  name: String,
  timestamp: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

// Scanned Network Schema and Model
const scannedNetworkSchema = new mongoose.Schema({
  ssid: String,
  mac: String,
  timestamp: { type: Date, default: Date.now },
});

const ScannedNetwork = mongoose.model("ScannedNetwork", scannedNetworkSchema);

// Valid MAC addresses storage
const validMacAddresses = {};

// Middleware setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to add a new student
app.post("/add-student", async (req, res) => {
  const { name, id, mac } = req.body;

  try {
    const student = new Student({ name, id, mac });
    await student.save();
    validMacAddresses[mac] = name; // Update valid MAC addresses
    res.status(201).send("Student added successfully");
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).send("Error adding student");
  }
});

// Route to handle MAC address scanning and network scan data
app.post("/scan", async (req, res) => {
  const { mac, ssid } = req.body; // Expecting either 'mac' or 'ssid' in the request body

  if (ssid && mac) {
    // Handle network scan data
    console.log(`Received network scan data: SSID: ${ssid}, MAC: ${mac}`);

    try {
      const scannedNetwork = new ScannedNetwork({ ssid, mac });
      await scannedNetwork.save();
      res.status(200).send("Network info received");
    } catch (error) {
      console.error("Error saving scanned network data:", error);
      res.status(500).send("Error saving network data");
    }
  } else if (mac) {
    // Handle attendance data (MAC address scanning)
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
  } else {
    res.status(400).send("Invalid data received");
  }
});

// Route to fetch all registered students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send("Error fetching students");
  }
});

// Route to update student information
app.put("/update-student/:id", async (req, res) => {
  const { id } = req.params;
  const { name, id: studentId, mac } = req.body;

  try {
    const student = await Student.findById(id);
    if (student) {
      const oldMac = student.mac;
      student.name = name;
      student.id = studentId;
      student.mac = mac;
      await student.save();

      // Update validMacAddresses
      delete validMacAddresses[oldMac]; // Remove the old MAC
      validMacAddresses[mac] = name; // Add the updated MAC
      res.send("Student updated successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).send("Error updating student");
  }
});

// Route to delete a student
app.delete("/delete-student/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (student) {
      delete validMacAddresses[student.mac]; // Remove from valid MAC addresses
      res.send("Student deleted successfully");
    } else {
      res.status(404).send("Student not found");
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).send("Error deleting student");
  }
});

// Route to fetch scanned network information
app.get("/networks", async (req, res) => {
  try {
    const networks = await ScannedNetwork.find().sort({ timestamp: -1 });
    res.json(networks);
  } catch (error) {
    console.error("Error fetching scanned networks:", error);
    res.status(500).send("Error fetching network data");
  }
});

// Route to delete all attendance records
app.delete("/delete-attendance", async (req, res) => {
  try {
    await Attendance.deleteMany({});
    res.send("All attendance records deleted successfully");
  } catch (error) {
    console.error("Error deleting attendance records:", error);
    res.status(500).send("Error deleting attendance records");
  }
});

// Route to fetch all attendance records
app.get("/attendance", async (req, res) => {
  try {
    const records = await Attendance.find().sort({ timestamp: -1 });
    res.json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).send("Error fetching attendance records");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
