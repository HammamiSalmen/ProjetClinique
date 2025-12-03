import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_URL from "../api";
import Swal from "sweetalert2";

export default function RendezVous(){
  const [list, setList] = useState([]);
  const [medecins, setMedecins] = useState([]);
  const [patients, setPatients] = useState([]);
  const [idMed, setIdMed] = useState("");
  const [idPat, setIdPat] = useState("");
  const [dateRdv, setDateRdv] = useState("");
  const [heureRdv, setHeureRdv] = useState("");
  const [salleRdv, setSalleRdv] = useState("");
  const [editing, setEditing] = useState(null);



  function load(){
    fetch(`${API_URL}/controllers/RendezVousController.php`, { credentials: 'include' })
      .then(r => r.json()).then(data => setList(data || [])).catch(()=>setList([]));
  }

  function loadMedecins(){
    fetch(`${API_URL}/controllers/MedecinController.php`, { credentials: 'include' })
      .then(r=>r.json()).then(data => setMedecins(data || [])).catch(()=>setMedecins([]));
  }

  function loadPatients(){
    fetch(`${API_URL}/controllers/PatientController.php`, { credentials: 'include' })
      .then(r=>r.json()).then(data => setPatients(data || [])).catch(()=>setPatients([]));
  }

  useEffect(()=>{
    load();
    loadMedecins();
    loadPatients();
  },[]);

  async function submit(e){
    e.preventDefault();
    const payload = { idMed: idMed, idPat: idPat, DateRdv: dateRdv, heureRdv: heureRdv, salleRdv: salleRdv };

    try {
      if(editing){
        await fetch(`${API_URL}/controllers/RendezVousController.php?id=${editing.idRdv}`, {
          method: "PUT",
          credentials: 'include',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
        Swal.fire("OK","Rendez-vous modifié","success");
      } else {
        await fetch(`${API_URL}/controllers/RendezVousController.php`, {
          method: "POST",
          credentials: 'include',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
        Swal.fire("OK","Rendez-vous ajouté","success");
      }
      setIdMed(""); setIdPat(""); setDateRdv(""); setHeureRdv(""); setSalleRdv(""); setEditing(null);
      load();
    } catch(e){
      Swal.fire("Erreur","Impossible de sauvegarder","error", e);
    }
  }

  async function remove(idRdv){
    const res = await Swal.fire({ title:"Supprimer ?", showCancelButton:true });
    if(res.isConfirmed){
      fetch(`${API_URL}/controllers/RendezVousController.php?id=${idRdv}`, { method:"DELETE", credentials:'include' })
        .then(()=>{ Swal.fire("Supprimé","", "success"); load(); })
        .catch(()=> Swal.fire("Erreur","Suppression échouée","error"));
    }
  }

  function startEdit(r){
    setEditing(r);
    setIdMed(r.idMed);
    setIdPat(r.idPat);
    setDateRdv(r.DateRdv);
    setHeureRdv(r.heureRdv);
    setSalleRdv(r.salleRdv);
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Rendez-vous</h2>

        <div className="row">
          <div className="col-md-5">
            <form onSubmit={submit}>
              <div className="mb-2">
                <select className="form-control" value={idMed} onChange={e=>setIdMed(e.target.value)} required>
                  <option value="">Choisir un médecin</option>
                  {medecins.map(m => <option key={m.idMed} value={m.idMed}>{m.nomMed}</option>)}
                </select>
              </div>

              <div className="mb-2">
                <select className="form-control" value={idPat} onChange={e=>setIdPat(e.target.value)} required>
                  <option value="">Choisir un patient</option>
                  {patients.map(p => <option key={p.idPat} value={p.idPat}>{p.nomPat}</option>)}
                </select>
              </div>

              <div className="mb-2">
                <input type="date" className="form-control" value={dateRdv} onChange={e=>setDateRdv(e.target.value)} required/>
              </div>

              <div className="mb-2">
                <input type="time" className="form-control" value={heureRdv} onChange={e=>setHeureRdv(e.target.value)} required/>
              </div>

              <div className="mb-2">
                <input className="form-control" placeholder="Salle" value={salleRdv} onChange={e=>setSalleRdv(e.target.value)} />
              </div>

              <button className="btn btn-primary me-2">{editing ? "Modifier" : "Ajouter"}</button>
              {editing && <button type="button" className="btn btn-secondary" onClick={()=>{ setEditing(null); setIdMed(""); setIdPat(""); setDateRdv(""); setHeureRdv(""); setSalleRdv(""); }}>Annuler</button>}
            </form>
          </div>

          <div className="col-md-7">
            <table className="table table-bordered">
              <thead><tr><th>idRdv</th><th>Médecin</th><th>Patient</th><th>Date</th><th>Heure</th><th>Salle</th><th>actions</th></tr></thead>
              <tbody>
                {list.map(r => (
                  <tr key={r.idRdv}>
                    <td>{r.idRdv}</td>
                    <td>{r.idMed}</td>
                    <td>{r.idPat}</td>
                    <td>{r.DateRdv}</td>
                    <td>{r.heureRdv}</td>
                    <td>{r.salleRdv}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={()=>startEdit(r)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>remove(r.idRdv)}>Suppr</button>
                    </td>
                  </tr>
                ))}
                {list.length===0 && <tr><td colSpan="7" className="text-center">Aucun rendez-vous</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
