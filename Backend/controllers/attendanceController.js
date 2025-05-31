const Attendance = require('../models/Attendance');
const { validMacAddresses } = require('./studentController');

const markAttendance = async (req, res) => {
  const { mac, name, status } = req.body;
  if (!mac || !name || !status) {
    return res.status(400).send("All fields are required");
  }
  try {
    const newRecord = new Attendance({ mac, name });
    await newRecord.save();
    res.status(201).send("Attendance marked successfully");
  } catch (error) {
    res.status(500).send("Error marking attendance");
  }
};

const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort({ timestamp: -1 });
    res.json(records);
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).send("Error fetching attendance records");
  }
};

const deleteAllAttendance = async (req, res) => {
  try {
    await Attendance.deleteMany({});
    res.send("All attendance records deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting attendance records");
  }
};

const handleScan = async (req, res) => {
  const { mac } = req.body;
  console.log(`Received MAC address: ${mac}`);

  if (validMacAddresses[mac]) {
    const name = validMacAddresses[mac];
    console.log(`Marked present: ${name}`);

    try {
      const existingRecord = await Attendance.findOne({ mac, name });

      if (!existingRecord) {
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
};

module.exports = {
  markAttendance,
  getAttendance,
  deleteAllAttendance,
  handleScan
}; 