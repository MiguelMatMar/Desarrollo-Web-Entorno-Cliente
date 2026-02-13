<?php
header('Content-Type: application/json');

$email = $_POST['email'] ?? '';
$pass = $_POST['pass'] ?? '';

$response = [
    "status" => "unrecognized",
    "data" => null
];


if ($email === "admin@mail.es" && $pass === "Admin123!") {
    $response["status"] = "admin";
} 
elseif ($email === "aragorn@mail.es" && $pass === "Aragorn123!") {
    $response["status"] = "standard";

    $response["data"] = [
        "nombre" => "Aragorn",
        "apellidos" => "Hijo de Arathorn",
        "dni" => "12345678X"
    ];
}

echo json_encode($response);