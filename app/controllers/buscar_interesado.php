<?php
require_once "../models/interesado.model.php";
$arrayName = [
    'nombre' => strval($_POST['nombre'] ?? ''),
    'apellido' => strval($_POST['apellido'] ?? ''),
    'localidad' => strval($_POST['localidad'] ?? ''),
    'cantidad' => $_POST['cantidad'] ?? ''
];
echo json_encode(Interesado::buscarInteresado($arrayName));