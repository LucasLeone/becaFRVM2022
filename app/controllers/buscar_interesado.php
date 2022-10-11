<?php
require_once "../models/interesado.model.php";
$arrayName = [
    'nombre' => strval($_POST['nombre'] ?? ''),
    'apellido' => strval($_POST['apellido'] ?? ''),
];
echo json_encode(Interesado::buscarInteresado($arrayName));