require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Error connecting to DB", err));

app.use(cors()); // Allow cross-origin requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const networkRoutes = require("./routes/networkRoutes");

// Use routes
app.use("/students", studentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/networks", networkRoutes);

// Start the server
app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
