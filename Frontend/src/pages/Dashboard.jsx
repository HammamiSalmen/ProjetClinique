import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Dashboard</h2>
        <p>Bienvenue dans votre espace de gestion.</p>
      </div>
    </>
  );
}

export default Dashboard;
