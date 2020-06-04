<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../config/database.php';
require_once '../objects/product.php';
require_once "../../config.php";
  
$database = new Database();
$db = $database->getConnection();

$neko = new Neko($db);
$neko->id = isset($_GET['id']) ? $_GET['id'] : die();
$stmt = $neko->readOne();

$row = $statement->fetch(PDO::FETCH_ASSOC); 
  
// delete the cat
if($row["name"] != null){
    if($row["pos"] != null) {
        unlink(SITE_ROOT . "/" . $row["pos"]);
    }
    if($fighter->delete()) {
        http_response_code(200);
        echo json_encode(array("message" => "Cat was deleted.")); 
    }
    else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to delete cat."));
    }
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Cat not found"));
}
?>