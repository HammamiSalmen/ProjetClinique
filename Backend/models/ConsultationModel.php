<?php
require_once "../config/Database.php";

class ConsultationModel {
    private $db;

    public function __construct() {
        $this->db = (new Database())->connect();
    }

    public function getAll() {
        $sql = "SELECT * FROM consultation";
        return $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($data) {
        $sql = "INSERT INTO consultation (id_medecin, id_patient, date_consult, notes)
                VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            $data['id_medecin'],
            $data['id_patient'],
            $data['date_consult'],
            $data['notes']
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM consultation WHERE id=?");
        return $stmt->execute([$id]);
    }
}
