<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

require_once '../config/database.php';
require_once '../objects/neko.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$neko = new Neko($db);

// query cats
$stmt = $neko->read();
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num > 0){
  
    // cats array
    $nekos=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $neko=array(
            "id" => intval($id),
            "name" => $name,
            "age" => intval($age),
            "info" => $info,
            "wins" => intval($wins),
            "loss" => intval($loss),
            "path" => $pos
        );
  
        array_push($nekos, $neko);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show products data in json format
    echo json_encode($nekos);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No cats here!"));
}
?>