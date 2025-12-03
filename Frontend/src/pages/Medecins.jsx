import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_URL from "../api";

function Medecins() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/controllers/MedecinController.php`)
      .then(res => res.json())
      .then(data => setList(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Médecins</h2>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Téléphone</th>
            </tr>
          </thead>
          <tbody>
            {list.map(m => (
              <tr key={m.idMed}>
                <td>{m.idMed}</td>
                <td>{m.nomMed}</td>
                <td>{m.telMed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Medecins;
