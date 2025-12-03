<?php
require_once "../config/Database.php";

class PatientModel {
    private $db;

    public function __construct() {
        $this->db = (new Database())->connect();
    }

    public function getAll() {
        return $this->db->query("SELECT * FROM patient")->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($data) {
        $sql = "INSERT INTO patient (nom, prenom, age) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$data['nom'], $data['prenom'], $data['age']]);
    }

    public function update($id, $data) {
        $sql = "UPDATE patient SET nom=?, prenom=?, age=? WHERE id=?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$data['nom'], $data['prenom'], $data['age'], $id]);
    }

    public function delete($id) {
        $sql = "DELETE FROM patient WHERE id=?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$id]);
    }
}
