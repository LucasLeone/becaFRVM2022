<?php
require_once "../config/connection.php";
class Interesado extends Connection
{
    public static function mostrarDatos()
    {
        try {
            $sql = "SELECT * FROM public.interesado";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function obtenerDatoId($id)
    {
        try {
            $sql = "SELECT * FROM interesado WHERE id_interesado = :id";
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
            $sql = "INSERT INTO interesado(nombre, apellido, telefono, email, direccion, numero, dni, localidad) VALUES (:nombre, :apellido, :telefono, :email, :direccion, :numero, :dni, :localidad)";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->bindParam(':apellido', $data['apellido']);
            $stmt->bindParam(':telefono', $data['telefono']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':direccion', $data['direccion']);
            $stmt->bindParam(':numero', $data['numero']);
            $stmt->bindParam(':dni', $data['dni']);
            $stmt->bindParam(':localidad', $data['localidad']);
            $stmt->execute();
            return true;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function actualizarDato($data)
    {
        try {
            $sql = "UPDATE interesado SET nombre = :nombre, apellido = :apellido, telefono = :telefono, email = :email, direccion = :direccion, numero = :numero, dni = :dni, localidad = :localidad WHERE id = :id";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->bindParam(':apellido', $data['apellido']);
            $stmt->bindParam(':telefono', $data['telefono']);
            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':direccion', $data['direccion']);
            $stmt->bindParam(':numero', $data['numero']);
            $stmt->bindParam(':dni', $data['dni']);
            $stmt->bindParam(':localidad', $data['localidad']);
            $stmt->bindParam(':id_interesado', $data['id_interesado']);
            $stmt->execute();
            return true;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
    public static function eliminarDato($id_interesado)
    {
        try {
            $sql = "DELETE FROM interesado WHERE id_interesado = :id_interesado";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':id_interesado', $id_interesado);
            $stmt->execute();
            return true;
        } catch (PDOException $th) {
            echo $th->getMessage();
        }
    }
}