<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once '../config/database.php';
require_once '../objects/neko.php';
  
$database = new Database();
$db = $database->getConnection();

$winner = new Neko($db);
$loser = new Neko($db);

$winner->id = isset($_GET['winner']) ? $_GET['winner'] : die();
$stmtwin = $winner->readOne();
$loser->id = isset($_GET['loser']) ? $_GET['loser'] : die();
$stmtloss = $loser->readOne();

$rowWin = $stmtwin->fetch(PDO::FETCH_ASSOC);
$rowLos = $stmtloss->fetch(PDO::FETCH_ASSOC);

// update the cat
if($rowWin["name"] != null && $rowLos["name"] != null) {
    $winner->wins = intval($rowWin["wins"]) + 1;
    $winner->loss = $rowWin["loss"];
    $loser->wins = $rowLos["wins"];
    $loser->loss = intval($rowLos["loss"]) + 1;

    if($winner->newStats() && $loser->newStats()) {
        http_response_code(200);
        echo json_encode(array("message" => "Cats were updated.")); 
    }
    else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update cats."));
    }
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Cat not found."));
}
?>