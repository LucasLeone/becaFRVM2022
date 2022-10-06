<?php
require_once "../config/connection.php";
class InteresadoCurso extends Connection
{
    public static function listarInteresados($id_curso)
    {
        try {
            $sql = "SELECT * FROM public.interesado WHERE curso_fk = :id_curso";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id_curso', $id_curso);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
}