<?php
class Connection
{

    public $contraseña = "admin1234";
    public $usuario = "postgres";
    public $nombreBaseDeDatos = "beca";
    public $rutaServidor = "127.0.0.1";
    public $puerto = "5432";
    public $connect;
    
    public static function getConnection()
    {
        try {
            $connection = new Connection();
            $connection->connect = new PDO("pgsql:host=$rutaServidor;port=$puerto;dbname=$nombreBaseDeDatos", $usuario, $contraseña);
            $connection->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $connection->connect;
        } catch (Exception $e) {
            echo "Ocurrió un error con la base de datos: " . $e->getMessage();
        }
    }
}

?>