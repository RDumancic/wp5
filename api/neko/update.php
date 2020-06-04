<?php
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

// update the cat
if(isset($_POST["id"]) && isset($_POST["name"]) && isset($_POST["age"]) && isset($_POST["info"]) && isset($_POST["wins"]) && isset($_POST["loss"])) {
    $neko->id = $_POST["id"];
    $stmt = $neko->readOne();

    $row = $stmt->fetch(PDO::FETCH_ASSOC); 

    if($row["name"] != null){
        $neko->name = $_POST["name"];
        $neko->age = $_POST["age"];
        $neko->info = $_POST["info"];
        $neko->wins = $_POST["wins"];
        $neko->loss = $_POST["loss"];
        if(isset($_FILES["image"]) && $_FILES["image"]["size"] > 0) {
            if($row["pos"] != null) {
                unlink(SITE_ROOT . "/" . $row["pos"]);
            }
            $neko->pos = $dir . uniqid(rand(), true) . "_" . $_FILES["image"]["name"];
        }
        else {
            $neko->pos = $row["pos"];
        }

        if($fighter->update()) {
            if(isset($_FILES["image"]) && $_FILES["image"]["size"] > 0) {
                if(move_uploaded_file($_FILES["image"]["_name"], SITE_ROOT . "/" . $neko->pos)) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Cat was updated.")); 
                }
                else {
                    http_response_code(503);
                    echo json_encode(array("message" => "Image couldn't be loaded."));
                }
            }
            else {
                http_response_code(200);
                echo json_encode(array("message" => "Cat was updated.")); 
            }
        }
        else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update cat."));
        }
    }
    else {
        http_response_code(404);
        echo json_encode(array("message" => "Cat not found"));
    }
}
else {
    http_response_code(400);
    echo json_encode(array("message" => "Data is incomplete."));
}
?>