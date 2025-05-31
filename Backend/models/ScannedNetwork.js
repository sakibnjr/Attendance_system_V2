const mongoose = require('mongoose');

const scannedNetworkSchema = new mongoose.Schema({
  ssid: String,
  mac: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ScannedNetwork', scannedNetworkSchema); 