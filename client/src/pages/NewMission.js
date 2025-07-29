import { useEffect, useState } from "react";
import api from "../api";
import MapPlanner from "../components/MapPlanner";

function NewMission() {
  const [form, setForm] = useState({
    name: "",
    altitude: "",
    droneId: "",
    areaCoordinates: [],
  });
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    api.get("/drones").then((res) => setDrones(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mission = {
      name: form.name,
      altitude: form.altitude,
      droneId: form.droneId,
      areaCoordinates: form.areaCoordinates,
    };

    if (
      !form.droneId ||
      !form.name ||
      !form.altitude ||
      form.areaCoordinates.length === 0
    ) {
      alert("Please fill all fields and select a drone.");
      return;
    }

    const res = await api.post("/missions", mission);
    alert("Mission created: " + res.data.name);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Plan New Mission
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <div className="space-y-2">
              <label className="text-md text-gray-700 font-medium">
                Mission Name
              </label>
              <input
                type="text"
                placeholder="Enter mission name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-md text-gray-700 font-medium">
                Altitude (m)
              </label>
              <input
                type="number"
                placeholder="Enter Altitude (m)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setForm({ ...form, altitude: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Drone
              </label>
              <select
                className="border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form.droneId}
                onChange={(e) => setForm({ ...form, droneId: e.target.value })}
              >
                <option value="">-- Select Drone --</option>
                {drones.map((drone) => (
                  <option key={drone._id} value={drone._id} title={drone._id}>
                    {drone.name} ({drone._id.slice(-4)})
                  </option>
                ))}
              </select>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-lg shadow font-medium">
              Submit Mission
            </button>
          </form>
        </div>

        <MapPlanner
          onAreaSelect={(coords) =>
            setForm({ ...form, areaCoordinates: coords })
          }
        />
      </div>
    </div>
  );
}

export default NewMission;
