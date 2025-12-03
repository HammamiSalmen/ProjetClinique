import { useState } from "react";
import Swal from "sweetalert2";
import API_URL from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginUser(e) {
    e.preventDefault();

    fetch(`${API_URL}/controllers/AuthController.php?action=login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Swal.fire("OK", "Connexion réussie", "success");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else {
          Swal.fire("Erreur", data.message, "error");
        }
      });
  }

  return (
    <div className="container mt-5">
      <h2>Connexion</h2>

      <form onSubmit={loginUser}>
        <input className="form-control mb-2"
               placeholder="Email"
               onChange={e => setEmail(e.target.value)} />

        <input type="password"
               className="form-control mb-2"
               placeholder="Mot de passe"
               onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-primary w-100">Se connecter</button>
      </form>

      <a href="/register" className="d-block mt-3">Créer un compte</a>
    </div>
  );
}

export default Login;
