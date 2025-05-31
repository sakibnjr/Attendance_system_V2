const express = require('express');
const router = express.Router();
const {
  handleNetworkScan,
  getNetworks,
  deleteAllNetworks
} = require('../controllers/networkController');

router.post('/scan', handleNetworkScan);
router.get('/networks', getNetworks);
router.delete('/networks', deleteAllNetworks);

module.exports = router; 