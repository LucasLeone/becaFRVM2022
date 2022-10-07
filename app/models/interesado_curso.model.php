<?php
require_once "../config/connection.php";
class InteresadoCurso extends Connection
{
    public static function listarInteresados($id_curso)
    {
        try {
            $sql = "SELECT * FROM public.interesados_curso WHERE id_curso = :id_curso";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id_curso', $id_curso);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }

    public static function registrarInteres($data)
    {
        try {
            $sql = "INSERT INTO public.interesados_curso(id_interesado, id_curso) VALUES (:id_interesado, :id_curso)";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id_interesado', $data['id_interesado']);
            $stmt->bindParam(':id_curso', $data['id_curso']);
            $stmt->execute();
            return true;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
}