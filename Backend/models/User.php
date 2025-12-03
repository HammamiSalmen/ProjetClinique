<?php
require_once "../config/Database.php";

class User {
    private $db;

    public function __construct() {
        $this->db = (new Database())->connect();
    }

    public function getAll() {
        return $this->db->query("SELECT id, username, role FROM users")->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getByUsername($username) {
        $sql = "SELECT * FROM users WHERE username=?";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([$username]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getByEmail($email) {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function register($email, $password, $role) {
        $stmt = $this->db->prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
        return $stmt->execute([$email, $password, $role]);
    }


    public function add($data) {
        $sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($sql);

        $hashed = password_hash($data['password'], PASSWORD_DEFAULT);

        return $stmt->execute([$data['username'], $hashed, $data['role']]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM users WHERE id=?");
        return $stmt->execute([$id]);
    }
}
