<?php
require_once "../models/interesado.model.php";
$arrayName = [
    'nombre' => strval($_POST['nombre'] ?? ''),
    'apellido' => strval($_POST['apellido'] ?? ''),
    'localidad' => strval($_POST['localidad'] ?? '')
];
echo json_encode(Interesado::buscarInteresado($arrayName));