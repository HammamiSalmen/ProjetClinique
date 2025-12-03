<?php
class Database {
    private $host = "localhost";
    private $db = "clinique";
    private $user = "root";
    private $pass = "";

    public function connect() {
        try {
            $pdo = new PDO(
                "mysql:host=".$this->host.";dbname=".$this->db,
                $this->user,
                $this->pass,
                [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]
            );
            return $pdo;
        } catch (PDOException $e) {
            die("Erreur connexion: " . $e->getMessage());
        }
    }
}
