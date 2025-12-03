<?php
require_once "../CORS.php";
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

require_once "../models/User.php";

$user = new User();

switch ($_GET['action'] ?? null) {

    /* -------------------- LOGIN -------------------- */
    case "login":
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(["success" => false, "message" => "Invalid input"]);
            exit;
        }

        $u = $user->getByEmail($data['email']);

        if (!$u || !password_verify($data['password'], $u['password'])) {
            echo json_encode(["success" => false, "message" => "Login incorrect"]);
            exit;
        }

        $_SESSION["logged"] = true;
        $_SESSION["user"] = [
            "email" => $u['email'],
            "role" => $u['role']
        ];

        setcookie("auth_user", $u['email'], time() + 3600, "/");
        setcookie("auth_token", session_id(), time() + 3600, "/");

        echo json_encode([
            "success" => true,
            "user" => $_SESSION["user"]
        ]);
        break;



    /* -------------------- LOGOUT -------------------- */
    case "logout":
        session_destroy();
        setcookie("auth_user", "", time() - 3600, "/");
        setcookie("auth_token", "", time() - 3600, "/");
        echo json_encode(["success" => true]);
        break;

    /* -------------------- CHECK SESSION -------------------- */
    case "check":
        if (!isset($_SESSION["logged"])) {
            echo json_encode(["logged" => false]);
        } else {
            echo json_encode([
                "logged" => true,
                "user" => $_SESSION["user"]
            ]);
        }
        break;

    case "register":
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data || !isset($data["email"]) || !isset($data["password"]) || !isset($data["role"])) {
            echo json_encode(["success" => false, "message" => "Champs manquants"]);
            exit;
        }

        // Vérifier si l'utilisateur existe déjà
        $exists = $user->getByEmail($data["email"]);
        if ($exists) {
            echo json_encode(["success" => false, "message" => "Email déjà utilisé"]);
            exit;
        }

        // Créer l'utilisateur
        $hashed = password_hash($data["password"], PASSWORD_DEFAULT);
        $ok = $user->register($data["email"], $hashed, $data["role"]);

        if ($ok) {
            echo json_encode(["success" => true, "message" => "Compte créé"]);
        } else {
            echo json_encode(["success" => false, "message" => "Erreur serveur"]);
        }
        break;

    default:
        echo json_encode(["error" => "Action inconnue"]);
}
