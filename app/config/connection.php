<?php
class Connection
{

    public $connect;
    
    public static function getConnection()
    {
        try {
            $connection = new Connection();
            $connection->connect = new PDO('pgsql:host=127.0.0.1;dbname=beca', 'postgres', 'admin1234');
            $connection->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $connection->connect;
        } catch (Exception $e) {
            echo "Ocurrió un error con la base de datos: " . $e->getMessage();
        }
    }
}

?>