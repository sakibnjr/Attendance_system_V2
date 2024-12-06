// src/routes/networkRoutes.js
const express = require("express");
const ScannedNetwork = require("../models/scannedNetwork");

const router = express.Router();

// Route to handle MAC address scanning and network scan data
router.post("/scan", async (req, res) => {
  const { mac, ssid } = req.body;

  if (ssid && mac) {
    try {
      const existingNetwork = await ScannedNetwork.findOne({ ssid, mac });

      if (!existingNetwork) {
        const scannedNetwork = new ScannedNetwork({ ssid, mac });
        await scannedNetwork.save();
        res.status(200).send("Network info received");
      } else {
        res.status(200).send("Duplicate network info. No new data saved.");
      }
    } catch (error) {
      res.status(500).send("Error saving network data");
    }
  } else if (mac) {
    res.send("MAC Address Received");
  } else {
    res.status(400).send("Invalid data received");
  }
});

// Get all scanned networks
router.get("/", async (req, res) => {
  try {
    const networks = await ScannedNetwork.find().sort({ timestamp: -1 });
    res.json(networks);
  } catch (error) {
    res.status(500).send("Error fetching scanned networks");
  }
});

// Delete all scanned network records
router.delete("/", async (req, res) => {
  try {
    await ScannedNetwork.deleteMany({});
    res.send("All scanned network records deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting scanned network records");
  }
});

module.exports = router;
