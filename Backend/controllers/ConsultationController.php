<?php
require_once "../CORS.php";
require_once "../models/ConsultationModel.php";

header("Content-Type: application/json");

$consult = new ConsultationModel();

switch ($_SERVER['REQUEST_METHOD']) {

    case "GET":
        echo json_encode($consult->getAll());
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        echo json_encode($consult->add($data));
        break;

    case "DELETE":
        echo json_encode($consult->delete($_GET['id']));
        break;
}
