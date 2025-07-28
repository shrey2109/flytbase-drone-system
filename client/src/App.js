import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewMission from "./pages/NewMission";
import Reports from "./pages/Reports";
import Monitor from "./pages/Monitor";

function App() {
  return (
    <Router>
      <nav className="flex gap-6 items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 shadow text-white sticky top-0 z-50">
        <h1 className="text-xl font-bold tracking-wide">Drone Survey System</h1>
        <Link to="/" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/mission" className="hover:underline">
          New Mission
        </Link>
        <Link to="/monitor" className="hover:underline">
          Monitor
        </Link>
        <Link to="/reports" className="hover:underline">
          Reports
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mission" element={<NewMission />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/monitor/:id" element={<Monitor />} />
      </Routes>
    </Router>
  );
}

export default App;
