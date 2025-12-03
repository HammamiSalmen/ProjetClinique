<?php
require_once "../CORS.php";
session_start();
header("Content-Type: application/json");

require_once "../models/Service.php";

$service = new Service();

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":
        echo json_encode($service->getAll());
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($service->add($data));
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($service->update($_GET['id'], $data));
        break;

    case "DELETE":
        echo json_encode($service->delete($_GET['id']));
        break;

    default:
        echo json_encode(["error" => "Méthode inconnue"]);
}
