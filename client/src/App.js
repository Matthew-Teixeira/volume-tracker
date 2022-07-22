import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddTank from "./Pages/AddTank";
import Admin from "./Pages/Admin";
import Dashboard from "./Pages/Dashboard";
import EditVolume from "./Pages/EditVolume";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UpdateOneTank from "./Pages/UpdateOneTank";
import UpdateTanks from "./Pages/UpdateTanks";
import VolumeAddition from "./Pages/VolumeAddition";
import Volumes from "./Pages/Volumes";

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main className="h-full w-full bg-indigo-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/volumes/:id" element={<Volumes />} />
          <Route path="/addVolume/:id" element={<VolumeAddition />} />
          <Route path="/admin/addTank" element={<AddTank />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/viewTanks" element={<UpdateTanks />} />
          <Route
            path="/admin/updateTank/:tank/:id"
            element={<UpdateOneTank />}
          />
          <Route path="/editVolume/:id" element={<EditVolume />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
