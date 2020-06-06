<?php
class Database{
  
    // specify your own database credentials
    private $host = "eu-cdbr-west-03.cleardb.net";
    private $db_name = "heroku_93a244c76cc2cbb";
    private $username = "b2acfd233df17c";
    private $password = "f152baec";
    public $conn;
  
    // get the database connection
    public function getConnection(){
  
        $this->conn = null;
  
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
  
        return $this->conn;
    }
}
?>