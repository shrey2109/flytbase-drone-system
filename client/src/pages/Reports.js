import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function Reports() {
  const [missions, setMissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    api.get("/missions").then((res) => setMissions(res.data));
  }, []);

  useEffect(() => {
    api.get("/missions").then((res) => {
      setMissions(res.data);
      setFiltered(res.data); // show all initially
    });
  }, []);

  useEffect(() => {
    const filteredList = missions.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        (m.droneId?.name || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || m.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFiltered(filteredList);
  }, [search, statusFilter, missions]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mission?"))
      return;
    try {
      await api.delete(`/missions/${id}`);
      setMissions((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete mission.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or drone"
          className="border px-4 py-2 rounded w-full sm:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded w-full sm:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="aborted">Aborted</option>
        </select>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">
          Survey Reports
        </h1>
        {filtered.length === 0 ? (
          <p>No missions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((m) => (
              <div key={m._id} className="bg-white p-5 rounded-xl shadow">
                <h2 className="text-lg font-bold text-blue-600">{m.name}</h2>
                <p>Status: {m.status}</p>
                <p>Altitude: {m.altitude}m</p>
                <p>Drone: {m.droneId?.name || "N/A"}</p>
                <p>Created: {new Date(m.createdAt).toLocaleString()}</p>

                <div className="flex gap-4 mt-3">
                  <Link
                    to={`/monitor/${m._id}`}
                    className="text-blue-600 underline text-sm"
                  >
                    Monitor Mission
                  </Link>

                  <button
                    onClick={() => handleDelete(m._id)}
                    className="text-red-600 text-sm underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
