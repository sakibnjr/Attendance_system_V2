// ScannedNetworkList.jsx

import React, { useState, useEffect } from "react";

const ScannedNetworkList = ({ url }) => {
  const [networks, setNetworks] = useState([]);

  const fetchNetworks = async () => {
    try {
      const response = await fetch(`${url}/networks`);
      const data = await response.json();
      setNetworks(data);
    } catch (error) {
      console.error("Error fetching scanned networks:", error);
    }
  };

  useEffect(() => {
    fetchNetworks();
  }, []);

  return (
    <div>
      <h2>Scanned Networks</h2>
      <ul>
        {networks.map((network) => (
          <li key={network._id}>
            SSID: {network.ssid}, MAC: {network.mac}, Timestamp:{" "}
            {new Date(network.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScannedNetworkList;
