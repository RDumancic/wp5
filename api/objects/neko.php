<?php
class Neko{
    // database connection and table name
    private $conn;
    private $table_name = "cats";
  
    // object properties
    public $id;
    public $name;
    public $age;
    public $catInfo;
    public $wins;
    public $loss;
    public $pos;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
  
        // select all query
        $query = "SELECT * FROM " . $this->table_name;
      
        // prepare query statement
        $stmt = $this->conn->prepare($query);
      
        // execute query
        $stmt->execute();
      
        return $stmt;
    }

    // create cat
    function create(){
        // query to insert record
        $query = "INSERT INTO " . $this->table_name . " SET name=:name, age=:age, info=:info, wins=:wins, loss=:loss, pos=:pos";
        $stmt = $this->conn->prepare($query);

        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":age", $this->age);
        $stmt->bindParam(":info", $this->info);
        $stmt->bindParam(":wins", $this->wins);
        $stmt->bindParam(":loss", $this->loss);
        $stmt->bindParam(":pos", $this->pos);

        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function readOne(){
        // query to read single record
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare( $query );

        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        return $stmt;
    }

    // update the cat
    function update(){
        $query = "UPDATE " . $this->table_name . " SET name=:name, age=:age, info=:info, wins=:wins, loss=:loss, pos=:pos WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        // bind new values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":age", $this->age);
        $stmt->bindParam(":info", $this->info);
        $stmt->bindParam(":wins", $this->wins);
        $stmt->bindParam(":loss", $this->loss);
        $stmt->bindParam(":pos", $this->pos);

        // execute the query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    // delete the cat
    function delete(){
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        // bind id of record to delete
        $stmt->bindParam(1, $this->id);

        // execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    // basically update but only for wins/losses
    function newStats() {
        $query = "UPDATE " . $this->table_name . " SET wins=:wins, loss=:loss WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        // bind updated values
        $statement->bindParam(":wins", $this->wins);
        $statement->bindParam(":loss", $this->loss);
        $statement->bindParam(":id", $this->id);

        // execute query
        if($statement->execute()){
            return true;
        }
        return false;
    }
}
?>