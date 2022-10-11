<?php
require_once "../config/connection.php";
class Curso extends Connection
{
    public static function mostrarDatos()
    {
        try {
            $sql = "SELECT * FROM public.curso";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function buscarCurso($data)
    {   
        $sql = "SELECT * FROM public.curso WHERE 1=1";
        $params = [];
        
        foreach(['nombre',] as $campo) {
            if(!empty($data[$campo])) {
                $sql .= sprintf(' AND %s ~* :%s ',$campo, $campo);
                $params[$campo] = $data[$campo];
            }
        }
        try {
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute($params);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $th) {
            return ['error'=> $th->getMessage()];  
        }
    }
    public static function obtenerDatoId($id)
    {
        try {
            $sql = "SELECT * FROM curso WHERE id_curso = :id";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $result = $stmt->fetch();
            return $result;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function guardarDato($data)
    {
        try {
            $sql = "INSERT INTO curso(nombre) VALUES (:nombre)";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->execute();
            return true;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function actualizarDato($data)
    {
        try {
            $sql = "UPDATE curso SET nombre = :nombre WHERE id_curso = :id";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->bindParam(':id', $data['id_curso']);
            $stmt->execute();
            return true;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function eliminarDato($id_curso)
    {
        try {
            $sql = "DELETE FROM curso WHERE id_curso = :id_curso";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id_curso', $id_curso);
            $stmt->execute();
            return true;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
}