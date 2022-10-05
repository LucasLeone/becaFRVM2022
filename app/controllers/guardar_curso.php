<?php
require_once "../models/curso.model.php";
$arrayName = array(
    'nombre' => $_POST['nombre'],
);

echo json_encode(Curso::guardarDato($arrayName));