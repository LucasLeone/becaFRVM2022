<?php
require_once "../models/interesado_curso.model.php";
echo json_encode(InteresadoCurso::listarInteresados($_POST['id_curso']));