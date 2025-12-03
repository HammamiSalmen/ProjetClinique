import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">Clinique</Link>

      <div>
        <Link className="btn btn-outline-light me-2" to="/medecins">Médecins</Link>
        <Link className="btn btn-outline-light me-2" to="/patients">Patients</Link>
        <Link className="btn btn-outline-light me-2" to="/services">Services</Link>
        <Link className="btn btn-outline-light me-2" to="/rendezvous">Rendez-vous</Link>
        <Link className="btn btn-outline-light" to="/consultation">Consultations</Link>
      </div>
    </nav>
  );
}

export default Navbar;
