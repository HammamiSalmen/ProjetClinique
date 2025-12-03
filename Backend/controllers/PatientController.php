<?php
require_once "../CORS.php";
require_once "../models/PatientModel.php";

header("Content-Type: application/json");

$patient = new PatientModel();

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":
        echo json_encode($patient->getAll());
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($patient->add($data));
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($patient->update($_GET['id'], $data));
        break;

    case "DELETE":
        echo json_encode($patient->delete($_GET['id']));
        break;
}
