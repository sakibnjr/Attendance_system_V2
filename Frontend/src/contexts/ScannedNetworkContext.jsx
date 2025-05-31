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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch networks from the server
  const fetchNetworks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/networks`);
      if (!response.ok) {
        throw new Error('Failed to fetch networks');
      }
      const data = await response.json();
      setNetworks(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching scanned networks:", error);
      setError(error.message);
    } finally {
      setLoading(false);
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
    setLoading(true);
    try {
      const response = await fetch(`${url}/networks`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error('Failed to delete networks');
      }

      console.log("All scanned networks deleted successfully");
      await fetchNetworks(); // Refresh the list after deletion
      setError(null);
    } catch (error) {
      console.error("Error deleting scanned networks:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScannedNetworkContext.Provider
      value={{ 
        networks, 
        fetchNetworks, 
        deleteAllNetworks,
        error,
        loading
      }}
    >
      {children}
    </ScannedNetworkContext.Provider>
  );
};
