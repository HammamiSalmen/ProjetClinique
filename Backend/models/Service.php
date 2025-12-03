<?php
require_once "../config/Database.php";

class Service {
    private $db;

    public function __construct() {
        $this->db = (new Database())->connect();
    }

    public function getAll() {
        return $this->db->query("SELECT * FROM service")->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($data) {
        $sql = "INSERT INTO service (nom, description) VALUES (?, ?)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$data['nom'], $data['description']]);
    }

    public function update($id, $data) {
        $sql = "UPDATE service SET nom=?, description=? WHERE id=?";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$data['nom'], $data['description'], $id]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM service WHERE id=?");
        return $stmt->execute([$id]);
    }
}
