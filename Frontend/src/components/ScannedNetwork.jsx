import { useScannedNetwork } from "../contexts/ScannedNetworkContext";
import { IoTrashBinOutline } from "react-icons/io5";

const ScannedNetwork = () => {
  const { networks, deleteAllNetworks } = useScannedNetwork();

  return (
    <div className="flex justify-center m-4">
      <aside className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-sm">Nearby Networks</p>
          <IoTrashBinOutline onClick={deleteAllNetworks} />
        </div>
        <div className="mt-4 max-h-60 overflow-y-auto border border-base-300 rounded-lg p-4">
          <ul className="space-y-2">
            {networks.map((network) => (
              <li
                key={network._id}
                className="p-2 bg-base-100 rounded-md shadow-sm"
              >
                <p className="text-green-400">
                  <span className="text-green-400">SSID:</span> {network.ssid}
                </p>
                <p className="text-black">
                  <span className="text-black">MAC:</span> {network.mac}
                </p>
                <p className="text-black">
                  <span className=" text-black">Timestamp:</span>{" "}
                  {new Date(network.timestamp).toLocaleString()}
                </p>
                <p className="text-green-400">$</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ScannedNetwork;
