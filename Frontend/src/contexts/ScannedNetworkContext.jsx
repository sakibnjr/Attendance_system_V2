import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const ScannedNetworkContext = createContext();

// Create a custom hook to use the ScannedNetworkContext
export const useScannedNetwork = () => {
  return useContext(ScannedNetworkContext);
};

// Provider component
export const ScannedNetworkProvider = ({ url, children }) => {
  const [networks, setNetworks] = useState([]);

  // Function to fetch networks from the server
  const fetchNetworks = async () => {
    try {
      const response = await fetch(`${url}/networks`);
      const data = await response.json();
      setNetworks(data);
    } catch (error) {
      console.error("Error fetching scanned networks:", error);
    }
  };

  // Fetch networks when the component mounts and set up a periodic update
  useEffect(() => {
    fetchNetworks();

    // Set up polling to refresh data every 10 seconds
    const intervalId = setInterval(fetchNetworks, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [url]);

  // Function to delete all scanned networks
  const deleteAllNetworks = async () => {
    try {
      const response = await fetch(`${url}/networks`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("All scanned networks deleted successfully");
        fetchNetworks(); // Refresh the list after deletion
      } else {
        console.error("Error deleting scanned networks");
      }
    } catch (error) {
      console.error("Error deleting scanned networks:", error);
    }
  };

  return (
    <ScannedNetworkContext.Provider
      value={{ networks, fetchNetworks, deleteAllNetworks }}
    >
      {children}
    </ScannedNetworkContext.Provider>
  );
};
