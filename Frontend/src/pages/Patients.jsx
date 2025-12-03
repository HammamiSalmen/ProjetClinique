import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API_URL from "../api";

function Patients() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/controllers/PatientController.php`)
      .then(res => res.json())
      .then(data => setList(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Patients</h2>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th><th>Nom</th><th>Téléphone</th>
            </tr>
          </thead>

          <tbody>
            {list.map(p => (
              <tr key={p.idPat}>
                <td>{p.idPat}</td>
                <td>{p.nomPat}</td>
                <td>{p.telPat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Patients;
