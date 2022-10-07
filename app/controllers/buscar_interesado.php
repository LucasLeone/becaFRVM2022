<?php
require_once "../models/interesado.model.php";
$arrayName = array(
    'nombre' => $_POST['nombre'],
    'apellido' => $_POST['apellido'],
);
echo json_encode(Interesado::buscarInteresado($arrayName));