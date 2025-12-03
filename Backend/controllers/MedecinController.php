<?php
require_once "../CORS.php";
require_once "../models/MedecinModel.php";

header("Content-Type: application/json");

$medecin = new MedecinModel();

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":
        echo json_encode($medecin->getAll());
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($medecin->add($data));
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($medecin->update($_GET['id'], $data));
        break;

    case "DELETE":
        echo json_encode($medecin->delete($_GET['id']));
        break;
}
