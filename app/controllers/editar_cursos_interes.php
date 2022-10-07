<?php
require_once "../models/interesado_curso.model.php";
echo json_encode(InteresadoCurso::obtenerCursosInteres($_POST['id_interesado']));