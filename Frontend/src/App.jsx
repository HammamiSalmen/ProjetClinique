import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Patients from "./pages/Patients.jsx";
import Medecins from "./pages/Medecins.jsx";
import Services from "./pages/Services.jsx";
import RendezVous from "./pages/RendezVous.jsx";
import Consultation from "./pages/Consultations.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/register" element={<Register />} />
      <Route path="/medecins" element={<Medecins />} />
      <Route path="/services" element={<Services />} />
      <Route path="/rendezvous" element={<RendezVous />} />
      <Route path="/consultation" element={<Consultation />} />
    </Routes>
  );
}

export default App;
