<?php
require_once "../models/interesado.model.php";
echo json_encode(Interesado::listarLocalidades());