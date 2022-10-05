<?php
require_once "../models/interesado.model.php";
$arrayName = array(
    'nombre' => $_POST['nombre'],
    'apellido' => $_POST['apellido'],
    'telefono' => $_POST['telefono'],
    'email' => $_POST['email'],
    'direccion' => $_POST['direccion'],
    'numero' => $_POST['numero'],
    'localidad' => $_POST['localidad'],
    'dni' => $_POST['dni'],
    'id_interesado' => $_POST['id_interesado']
);

echo json_encode(Interesado::actualizarDato($arrayName));