require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const networkRoutes = require('./routes/networkRoutes');

// Import controller for initial setup
const { loadValidMacAddresses } = require('./controllers/studentController');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', studentRoutes);
app.use('/', attendanceRoutes);
app.use('/', networkRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Database connection error:", err));

// Start server
app.listen(process.env.PORT, async () => {
  await loadValidMacAddresses();
  console.log(`Server running at ${process.env.PORT}`);
});
