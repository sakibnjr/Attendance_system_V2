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

const scannedNetworkSchema = new mongoose.Schema({
  ssid: String,
  mac: String,
  timestamp: { type: Date, default: Date.now },
});

const ScannedNetwork = mongoose.model("ScannedNetwork", scannedNetworkSchema);
const Student = mongoose.model("Student", studentSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);

let validMacAddresses = {};

app.use(cors()); // Allow cross-origin requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load all valid MAC addresses from the database
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
    validMacAddresses[mac] = name; // Update cache
    res.status(201).send("Student added successfully");
  } catch (error) {
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
      // Check if both SSID and MAC already exist together
      const existingNetwork = await ScannedNetwork.findOne({ ssid, mac });

      if (!existingNetwork) {
        // If either SSID or MAC is new, save the new record
        const scannedNetwork = new ScannedNetwork({ ssid, mac });
        await scannedNetwork.save();
        res.status(200).send("Network info received");
      } else {
        // If both SSID and MAC exist, do not save duplicate entry
        res.status(200).send("Duplicate network info. No new data saved.");
      }
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

// ** New Endpoint to Get All Scanned Networks **
app.get("/networks", async (req, res) => {
  try {
    const networks = await ScannedNetwork.find().sort({ timestamp: -1 });
    res.json(networks);
  } catch (error) {
    console.error("Error fetching scanned networks:", error);
    res.status(500).send("Error fetching scanned networks");
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
    const student = await Student.findByIdAndDelete(id);
    if (student) {
      delete validMacAddresses[student.mac]; // Update cache
      res.send("Student deleted successfully");
    } else {
      res.status(404).send("Student not found");
    }
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

// Delete all scanned network records
app.delete("/networks", async (req, res) => {
  try {
    await ScannedNetwork.deleteMany({});
    res.send("All scanned network records deleted successfully");
  } catch (error) {
    console.error("Error deleting scanned network records:", error);
    res.status(500).send("Error deleting scanned network records");
  }
});

app.listen(process.env.PORT, async () => {
  await loadValidMacAddresses();
  // Load valid MAC addresses on startup
  console.log(`Server running at ${process.env.PORT}`);
});
