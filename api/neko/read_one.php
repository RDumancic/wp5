<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json; charset=UTF-8');

require_once '../config/database.php';
require_once '../objects/neko.php';

$database = new Database();
$db = $database->getConnection();
  
$neko = new Neko($db);

$neko->id = isset($_GET['id']) ? $_GET['id'] : die();
$stmt = $neko->readOne();
$row = $stmt->fetch(PDO::FETCH_ASSOC); 
  
if($row["name"] != null) {
    // create array
    extract($row);

    $neko = array(
        "id" =>  intval($id),
        "name" => $name,
        "age" => intval($age),
        "info" => $info,
        "wins" => intval($wins),
        "loss" => intval($loss),
        "pos" => $pos
    );
    http_response_code(200);
    echo json_encode($neko);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Cat does not exist."));
}
?>