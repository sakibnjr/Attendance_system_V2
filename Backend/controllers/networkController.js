const ScannedNetwork = require('../models/ScannedNetwork');

const handleNetworkScan = async (req, res) => {
  const { ssid, mac } = req.body;
  console.log(`Received network scan data: SSID: ${ssid}, MAC: ${mac}`);

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
    console.error("Error saving scanned network data:", error);
    res.status(500).send("Error saving network data");
  }
};

const getNetworks = async (req, res) => {
  try {
    const networks = await ScannedNetwork.find().sort({ timestamp: -1 });
    res.json(networks);
  } catch (error) {
    console.error("Error fetching scanned networks:", error);
    res.status(500).send("Error fetching scanned networks");
  }
};

const deleteAllNetworks = async (req, res) => {
  try {
    await ScannedNetwork.deleteMany({});
    res.send("All scanned network records deleted successfully");
  } catch (error) {
    console.error("Error deleting scanned network records:", error);
    res.status(500).send("Error deleting scanned network records");
  }
};

module.exports = {
  handleNetworkScan,
  getNetworks,
  deleteAllNetworks
}; 