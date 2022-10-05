<?php
require_once "../models/curso.model.php";
echo json_encode(Curso::eliminarDato($_POST['id']));