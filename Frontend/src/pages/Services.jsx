import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API_URL from "../api";
import Swal from "sweetalert2";

export default function Services(){
  const [list, setList] = useState([]);
  const [nom, setNom] = useState("");
  const [chefSc, setChefSc] = useState("");
  const [nbrMed, setNbrMed] = useState(0);
  const [editing, setEditing] = useState(null);



  function load(){
    fetch(`${API_URL}/controllers/ServiceController.php`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => setList(data || []))
      .catch(err => console.error(err));
  }

  useEffect(() => { load(); }, []);

  async function submit(e){
    e.preventDefault();
    const payload = { nomSc: nom, chefSc: chefSc || null, nbrMed: Number(nbrMed) };

    try {
      if(editing){
        await fetch(`${API_URL}/controllers/ServiceController.php?id=${editing.codSc}`, {
          method: "PUT",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        Swal.fire("OK", "Service modifié", "success");
      } else {
        await fetch(`${API_URL}/controllers/ServiceController.php`, {
          method: "POST",
          credentials: 'include',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        Swal.fire("OK", "Service ajouté", "success");
      }
      setNom(""); setChefSc(""); setNbrMed(0); setEditing(null);
      load();
    } catch(e){
      Swal.fire("Erreur", "Impossible de sauvegarder", "error", e);
    }
  }

  async function remove(codSc){
    const res = await Swal.fire({
      title: "Supprimer ?",
      text: "Voulez-vous supprimer ce service ?",
      icon: "warning",
      showCancelButton: true
    });
    if(res.isConfirmed){
      fetch(`${API_URL}/controllers/ServiceController.php?id=${codSc}`, {
        method: "DELETE",
        credentials: 'include'
      }).then(()=>{ Swal.fire("Supprimé", "", "success"); load(); })
        .catch(()=> Swal.fire("Erreur", "Suppression échouée", "error"));
    }
  }

  function startEdit(s){
    setEditing(s);
    setNom(s.nomSc || "");
    setChefSc(s.chefSc || "");
    setNbrMed(s.nbrMed || 0);
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Services</h2>

        <div className="row">
          <div className="col-md-5">
            <form onSubmit={submit}>
              <div className="mb-2">
                <input className="form-control" placeholder="Nom du service" value={nom} onChange={e=>setNom(e.target.value)} required/>
              </div>
              <div className="mb-2">
                <input className="form-control" placeholder="chefSc (idMed)" value={chefSc} onChange={e=>setChefSc(e.target.value)} />
              </div>
              <div className="mb-2">
                <input className="form-control" type="number" placeholder="Nombre de médecins" value={nbrMed} onChange={e=>setNbrMed(e.target.value)} />
              </div>
              <button className="btn btn-primary me-2">{editing ? "Modifier" : "Ajouter"}</button>
              {editing && <button type="button" className="btn btn-secondary" onClick={()=>{ setEditing(null); setNom(""); setChefSc(""); setNbrMed(0); }}>Annuler</button>}
            </form>
          </div>

          <div className="col-md-7">
            <table className="table table-bordered">
              <thead>
                <tr><th>codSc</th><th>nomSc</th><th>chefSc</th><th>nbrMed</th><th>actions</th></tr>
              </thead>
              <tbody>
                {list.map(s => (
                  <tr key={s.codSc}>
                    <td>{s.codSc}</td>
                    <td>{s.nomSc}</td>
                    <td>{s.chefSc}</td>
                    <td>{s.nbrMed}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={()=>startEdit(s)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>remove(s.codSc)}>Suppr</button>
                    </td>
                  </tr>
                ))}
                {list.length===0 && <tr><td colSpan="5" className="text-center">Aucun service</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
