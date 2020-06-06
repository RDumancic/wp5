<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../config/database.php';
require_once '../objects/neko.php';
require_once "../../config.php";
  
$database = new Database();
$db = $database->getConnection();
  
$neko = new Neko($db);
$dir = "cell/";
  
if(isset($_POST["name"]) && isset($_POST["age"]) && isset($_POST["info"]) && isset($_POST["wins"]) && isset($_POST["loss"])) {
    $neko->name = $_POST["name"];
    $neko->age = $_POST["age"];
    $neko->info = $_POST["info"];
    $neko->wins = $_POST["wins"];
    $neko->loss = $_POST["loss"];
    $neko->pos = $dir . uniqid(rand(), true) . "_" . $_FILES["image"]["name"];
  
    // create the product
    if($product->create()) {
        if (move_uploaded_file($_FILES["image"]["_name"], SITE_ROOT . "/" . $neko->pos)) {
            http_response_code(201);
            echo json_encode(array("message" => "Neko was created."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Image couldn't be loaded."));
        }    
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create Neko."));
    }
}

// tell the user data is incomplete
else{
    http_response_code(400);
    echo json_encode(array("message" => "Data is incomplete."));
}
?>