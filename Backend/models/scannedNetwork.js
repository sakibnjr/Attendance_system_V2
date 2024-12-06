// src/models/scannedNetwork.js
const mongoose = require("mongoose");

const scannedNetworkSchema = new mongoose.Schema({
  ssid: { type: String, required: true },
  mac: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ScannedNetwork = mongoose.model("ScannedNetwork", scannedNetworkSchema);

module.exports = ScannedNetwork;
