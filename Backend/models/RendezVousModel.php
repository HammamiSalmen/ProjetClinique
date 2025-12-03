<?php
require_once "../config/Database.php";

class RendezVousModel {
    private $db;

    public function __construct() {
        $this->db = (new Database())->connect();
    }

    public function getAll() {
        return $this->db->query("SELECT * FROM rendezvous")->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($data) {
        $sql = "INSERT INTO rendezvous (idMed, idPat, DateRdv, heureRdv, salleRdv, etatRdv)
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['idMed'],
            $data['idPat'],
            $data['DateRdv'],
            $data['heureRdv'],
            $data['salleRdv'],
            0
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM rendezvous WHERE id=?");
        return $stmt->execute([$id]);
    }
}
