<?php
require_once "../models/curso.model.php";
$arrayName = array(
    'nombre' => $_POST['nombre'],
    'id_curso' => $_POST['id_curso']
);

echo json_encode(Curso::actualizarDato($arrayName));