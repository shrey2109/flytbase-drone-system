import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import api from "../api";

function Monitor() {
  const [position, setPosition] = useState([18.5204, 73.8567]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("not-started");
  const [intervalId, setIntervalId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [drone, setDrone] = useState(null);
  const { id: missionId } = useParams();

  useEffect(() => {
    // Fetch mission details
    if (missionId) {
      api.get(`/missions`).then((res) => {
        const mission = res.data.find((m) => m._id === missionId);
        if (mission?.droneId) {
          // Now fetch drone details
          api
            .get(`/drones/${mission.droneId._id}`)
            .then((res) => setDrone(res.data));
        }
      });
    }
  }, [missionId]);

  const startMission = () => {
    if (status === "in-progress") return;
    setStatus("in-progress");
    const id = setInterval(() => {
      setPosition((prev) => [prev[0] + 0.0001, prev[1] + 0.0001]);
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(id);
          setStatus("completed");
          return 100;
        }
        return prev + 5;
      });
    }, 1000);
    setIntervalId(id);
  };

  const pauseMission = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setStatus("paused");
    }
  };

  const abortMission = () => {
    if (intervalId) clearInterval(intervalId);
    setProgress(0);
    setStatus("aborted");
  };

  useEffect(() => {
    if (progress >= 100 && status !== "completed") {
      setStatus("completed");
      if (missionId) {
        api
          .put(`/missions/${missionId}/status`, { status: "completed" })
          .then(() => console.log("Mission marked completed"))
          .catch(() => console.error("Status update failed"));
      }
    }
  }, [progress]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Live Mission Monitor
        </h1>

        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={startMission}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg shadow"
          >
            Start
          </button>
          <button
            onClick={pauseMission}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-lg shadow"
          >
            Pause
          </button>
          <button
            onClick={abortMission}
            className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-lg shadow"
          >
            Abort
          </button>
        </div>

        <p className="text-gray-700 text-md mt-4">
          Status: <span className="font-semibold">{status}</span> | Progress:{" "}
          <span className="font-semibold">{progress}%</span>
        </p>

        <MapContainer center={position} zoom={15} className="h-[400px] w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={position}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
              iconSize: [32, 32],
            })}
            eventHandlers={{
              click: () => setShowDetails(true),
            }}
          />
        </MapContainer>

        {showDetails && drone && (
          <div className="absolute top-10 right-10 bg-white p-4 shadow-xl rounded-lg z-[1000]">
            <h2 className="text-lg font-bold">Drone Details</h2>
            <p>
              <b>Model:</b> {drone.model}
            </p>
            <p>
              <b>Battery:</b> {drone.battery || "85%"}
            </p>
            <p>
              <b>Status:</b> {status}
            </p>
            <button
              onClick={() => setShowDetails(false)}
              className="text-blue-600 mt-2"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Monitor;
