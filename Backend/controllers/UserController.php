<?php
require_once "../CORS.php";
session_start();
header("Content-Type: application/json");

require_once "../models/User.php";

$user = new User();

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":
        echo json_encode($user->getAll());
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($user->add($data));
        break;

    case "DELETE":
        echo json_encode($user->delete($_GET["id"]));
        break;

    default:
        echo json_encode(["error" => "Méthode inconnue"]);
}
