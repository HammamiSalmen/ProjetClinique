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
        $sql = "INSERT INTO rendezvous (id_medecin, id_patient, date_rdv)
                VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['id_medecin'],
            $data['id_patient'],
            $data['date_rdv']
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM rendezvous WHERE id=?");
        return $stmt->execute([$id]);
    }
}
