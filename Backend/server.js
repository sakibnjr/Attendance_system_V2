require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();

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

const validMacAddresses = {};

// Load valid MAC addresses from MongoDB on server startup
async function loadValidMacAddresses() {
  try {
    const students = await Student.find();
    students.forEach((student) => {
      validMacAddresses[student.mac] = student.name;
    });
    console.log("Valid MAC addresses loaded from MongoDB.");
  } catch (error) {
    console.error("Error loading MAC addresses from MongoDB:", error);
  }
}

// Initialize valid MAC addresses
loadValidMacAddresses();

app.use(cors()); // Allow cross-origin requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// app.listen(process.env.PORT, () => {
//   console.log(`Server running at http://localhost:${process.env.PORT}`);
// });

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
