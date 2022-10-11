<?php
require_once "../models/interesado_curso.model.php";
$arrayName = [
    'id_curso' => $_POST['id_curso'],
    'nombre' => strval($_POST['nombre'] ?? ''),
    'apellido' => strval($_POST['apellido'] ?? ''),
];
echo json_encode(InteresadoCurso::buscarInteresadoCurso($arrayName));