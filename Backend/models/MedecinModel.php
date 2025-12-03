<?php
require_once "../config/Database.php";

class MedecinModel {
    private $db;

    public function __construct() {
        $this->db = (new Database())->connect();
    }

    public function getAll() {
        $sql = "SELECT * FROM medecin";
        return $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($data) {
        $sql = "INSERT INTO medecin (nom, prenom, specialite) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$data['nom'], $data['prenom'], $data['specialite']]);
    }

    public function update($id, $data) {
        $sql = "UPDATE medecin SET nom=?, prenom=?, specialite=? WHERE id=?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$data['nom'], $data['prenom'], $data['specialite'], $id]);
    }

    public function delete($id) {
        $sql = "DELETE FROM medecin WHERE id=?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
}
