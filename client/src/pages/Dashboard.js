import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    api.get("/drones").then((res) => setDrones(res.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Drone Fleet</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {drones.map((drone) => (
            <div key={drone._id} className="p-4 border rounded shadow">
              <div className="bg-white border-l-4 border-blue-600 p-5 rounded-xl shadow hover:shadow-md transition">
                <h2 className="text-lg font-semibold text-gray-800">
                  {drone.name}
                </h2>
                <p className="text-md text-gray-600">
                  Status:
                  <span
                    className={`ml-1 font-medium 
      ${drone.status === "available" ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {drone.status}
                  </span>
                </p>
                <p className="text-md text-gray-600">ID: {drone._id}</p>
                <p className="text-md text-gray-600">
                  Battery: {drone.battery}%
                </p>
                <p className="text-md text-gray-600">
                  Location: {drone.location.lat.toFixed(4)},{" "}
                  {drone.location.lng.toFixed(4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
