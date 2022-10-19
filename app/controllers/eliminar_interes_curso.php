<?php
require_once "../models/interesado_curso.model.php";
$arrayName = [
    'id_curso' => $_POST['id_curso'],
    'id_interesado' => $_POST['id_interesado'],
];
echo json_encode(InteresadoCurso::eliminarInteres($arrayName));