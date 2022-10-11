<?php
require_once "../models/curso.model.php";
$arrayName = [
    'nombre' => strval($_POST['nombre'] ?? ''),
];
echo json_encode(Curso::buscarCurso($arrayName));