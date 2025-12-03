import { useState } from "react";
import Swal from "sweetalert2";
import API_URL from "../api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("3");

  function registerUser(e) {
    e.preventDefault();

    fetch(`${API_URL}/controllers/AuthController.php?action=register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Swal.fire("OK", "Compte créé", "success");
          window.location.href = "/";
        } else {
          Swal.fire("Erreur", data.message, "error");
        }
      });
  }

  return (
    <div className="container mt-5">
      <h2>Créer un compte</h2>

      <form onSubmit={registerUser}>
        <input className="form-control mb-2" placeholder="Email"
               onChange={e => setEmail(e.target.value)} />

        <input type="password" className="form-control mb-2"
               placeholder="Mot de passe"
               onChange={e => setPassword(e.target.value)} />

        <select className="form-control mb-2" onChange={e => setRole(e.target.value)}>
          <option value="3">Patient</option>
          <option value="2">Médecin</option>
          <option value="1">ChefService</option>
        </select>

        <button className="btn btn-success w-100">Créer</button>
      </form>
    </div>
  );
}

export default Register;
