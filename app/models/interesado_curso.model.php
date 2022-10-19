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
    public static function buscarInteresadoCurso($data)
    {   
        $sql = "SELECT interesado.id_interesado, interesado.nombre, interesado.apellido, interesado.telefono, interesado.email, interesado.direccion, interesado.numero, interesado.localidad, interesado.dni FROM interesados_curso INNER JOIN interesado ON interesado.id_interesado = interesados_curso.id_interesado WHERE id_curso = :id_curso";
        $params = [];
        $params['id_curso'] = $data['id_curso'];
        
        foreach(['nombre','apellido','localidad'] as $campo) {
            if(!empty($data[$campo])) {
                $sql .= sprintf(' AND interesado.%s ~* :%s ', $campo, $campo);
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
    public static function obtenerCursosInteres($id_interesado)
    {
        try {
            $sql = "SELECT * FROM public.interesados_curso WHERE id_interesado = :id_interesado";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id_interesado', $id_interesado);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
}