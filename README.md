# 🚁 Drone Survey Management System — FlytBase 2025

A full-stack web application to plan, monitor, and manage drone survey missions. Designed for real-time mission planning, drone fleet visualization, and dynamic reporting.

---

## 🛠️ Tech Stack

- **Frontend**: ReactJS, Leaflet.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Atlas)
- **Map Library**: Leaflet + react-leaflet-draw
- **Hosting**:
  - Backend: [✅ Deployed on Railway](flytbase-drone-system-production.up.railway.app)
  - Frontend: (Deployment in progress – tested locally)

---

## 🚀 Features Implemented

### 1. 🗺️ Mission Planner

- Interactive map using Leaflet
- Draw & edit mission paths (polylines)
- Select drones via dropdown (`Drone ID : Drone Name`)
- Save mission to database

### 2. 🛰️ Drone Monitoring

- Simulates drone progress along the assigned path
- Real-time status updates (Idle, In Progress, Completed)
- Visualization on map

### 3. 📄 Reports

- View all completed missions
- Displays mission summary (distance, duration, etc.)

---

## 🔧 Bonus Features

### ✅ Real-Time Mission Status Syncing

- Automatically updates the mission status to `"in-progress"` and `"completed"` during the simulation.
- Achieved via a `PUT /missions/:id/status` call after simulation ends.

### ✅ Drone Dropdown in New Mission

- Improved UX by adding a dropdown in the "New Mission" page.
- Displays available drones in the format: `drone_id : drone_name` instead of manually typing complex IDs.

### ✅ Drone Details Modal

- Click on a drone marker in the Monitor page to view additional details.
- Displays drone model, battery level, and last active status in a popup modal.

### ✅ Mission Search & Filter

- Search and filter missions by:
  - Mission name
  - Drone name
  - Status (`pending`, `in-progress`, `completed`)
- Added to the Reports tab to improve navigation and UX.

### ✅ Mission Deletion

- Option to delete existing missions from both:
  - Map Planner (Mission Planner page)
  - Reports section
- Ensures better mission management and data cleanup.

---

## 📦 Project Structure

flytbase-drone-system/
├── client/ # React frontend
├── server/ # Express backend
├── .env # Environment variables
├── vercel.json # Deployment config (if needed)
└── README.md # You’re here!

---

## ⚙️ Run Locally

### Prerequisites:

- Node.js (v18.x)
- MongoDB URI

### 1. Clone the Repository

git clone https://github.com/shrey2109/flytbase-drone-system.git
cd flytbase-drone-system

### 2. Backend Setup

cd server
npm install
touch .env

# Add your MongoDB URI to .env

MONGO_URI=your-mongodb-uri
npm start

### 3. Frontend Setup

cd ../client
npm install --legacy-peer-deps
npm start

- Now open: http://localhost:3000

### ⚙️ API Endpoints

- GET /api/drones
- POST /api/missions
- GET /api/missions
- DELETE /api/missions/:id

### 💡 Future Improvements

- Add user authentication
- WebSocket-based real-time drone updates
- Export mission reports as PDF
- Mission scheduling / ETA predictions

### 🙏 Thank You

Built with dedication for the FlytBase 2025.
Crafted for real-world use, tested thoroughly, and built with a clean, modular structure.
