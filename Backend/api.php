<?php

$entity = $_GET['entity'] ?? null;

switch ($entity) {
    case "medecin":
        require "controllers/MedecinController.php";
        break;

    case "patient":
        require "controllers/PatientController.php";
        break;

    case "consultation":
        require "controllers/ConsultationController.php";
        break;

    case "rdv":
        require "controllers/RendezVousController.php";
        break;

    default:
        echo json_encode(["erreur" => "Route inconnue"]);
}
