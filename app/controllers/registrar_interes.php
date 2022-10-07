<?php
require_once "../models/interesado_curso.model.php";
$arrayName = array(
    'id_interesado' => $_POST['id_interesado'],
    'id_curso' => $_POST['id_curso']
);

echo json_encode(InteresadoCurso::registrarInteres($arrayName));