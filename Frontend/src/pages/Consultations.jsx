import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_URL from "../api";
import Swal from "sweetalert2";

export default function Consultations(){
  const [list, setList] = useState([]);
  const [rdvs, setRdvs] = useState([]);
  const [idRdv, setIdRdv] = useState("");
  const [diagnostique, setDiagnostique] = useState("");
  const [ordonnance, setOrdonnance] = useState("");
  const [editing, setEditing] = useState(null);
    
 

  function load(){
    fetch(`${API_URL}/controllers/ConsultationController.php`, { credentials: 'include' })
      .then(r=>r.json()).then(data=>setList(data || [])).catch(()=>setList([]));
  }

  function loadRdvs(){
    fetch(`${API_URL}/controllers/RendezVousController.php`, { credentials: 'include' })
      .then(r=>r.json()).then(data=>setRdvs(data || [])).catch(()=>setRdvs([]));
  }

  useEffect(()=>{ load(); loadRdvs(); }, []);

  async function submit(e){
    e.preventDefault();
    const payload = { idRdv: idRdv, diagnostique, ordonnance };

    try {
      if(editing){
        await fetch(`${API_URL}/controllers/ConsultationController.php?id=${editing.idCons}`, {
          method: "PUT",
          credentials: 'include',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
        Swal.fire("OK","Consultation modifiée","success");
      } else {
        await fetch(`${API_URL}/controllers/ConsultationController.php`, {
          method: "POST",
          credentials: 'include',
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
        Swal.fire("OK","Consultation ajoutée","success");
      }
      setIdRdv(""); setDiagnostique(""); setOrdonnance(""); setEditing(null);
      load();
    } catch(e){
      Swal.fire("Erreur","Impossible de sauvegarder","error", e);
    }
  }

  async function remove(idCons){
    const res = await Swal.fire({ title:"Supprimer ?", showCancelButton:true });
    if(res.isConfirmed){
      fetch(`${API_URL}/controllers/ConsultationController.php?id=${idCons}`, { method:"DELETE", credentials:'include' })
        .then(()=>{ Swal.fire("Supprimé","", "success"); load(); })
        .catch(()=> Swal.fire("Erreur","Suppression échouée","error"));
    }
  }

  function startEdit(c){
    setEditing(c);
    setIdRdv(c.idRdv);
    setDiagnostique(c.diagnostique || "");
    setOrdonnance(c.ordonnance || "");
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Consultations</h2>

        <div className="row">
          <div className="col-md-5">
            <form onSubmit={submit}>
              <div className="mb-2">
                <select className="form-control" value={idRdv} onChange={e=>setIdRdv(e.target.value)} required>
                  <option value="">Choisir un rendez-vous</option>
                  {rdvs.map(r => <option key={r.idRdv} value={r.idRdv}>#{r.idRdv} - med:{r.idMed} pat:{r.idPat} - {r.DateRdv}</option>)}
                </select>
              </div>

              <div className="mb-2">
                <textarea className="form-control" placeholder="Diagnostique" value={diagnostique} onChange={e=>setDiagnostique(e.target.value)}></textarea>
              </div>

              <div className="mb-2">
                <input className="form-control" placeholder="Ordonnance" value={ordonnance} onChange={e=>setOrdonnance(e.target.value)} />
              </div>

              <button className="btn btn-primary me-2">{editing ? "Modifier" : "Ajouter"}</button>
              {editing && <button type="button" className="btn btn-secondary" onClick={()=>{ setEditing(null); setIdRdv(""); setDiagnostique(""); setOrdonnance(""); }}>Annuler</button>}
            </form>
          </div>

          <div className="col-md-7">
            <table className="table table-bordered">
              <thead><tr><th>idCons</th><th>Rdv</th><th>Diagnostique</th><th>Ordonnance</th><th>actions</th></tr></thead>
              <tbody>
                {list.map(c => (
                  <tr key={c.idCons}>
                    <td>{c.idCons}</td>
                    <td>{c.idRdv}</td>
                    <td>{c.diagnostique}</td>
                    <td>{c.ordonnance}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={()=>startEdit(c)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>remove(c.idCons)}>Suppr</button>
                    </td>
                  </tr>
                ))}
                {list.length===0 && <tr><td colSpan="5" className="text-center">Aucune consultation</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
