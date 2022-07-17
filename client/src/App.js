import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
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
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/volumes/:id" element={<Volumes/>}/>
        <Route path="/addVolume/:id" element={<VolumeAddition />}/>
      </Routes>
      </main>
    </Router>
  );
}

export default App;
