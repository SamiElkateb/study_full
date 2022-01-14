<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
header('Access-Control-Allow-Origin: http://' . getenv('HOST_IP') . ':3000');

use \Firebase\JWT\JWT;


$secret_key = getenv("JWT_SECRET");
$jwt = null;

$data = json_decode(file_get_contents("php://input"));

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];

$arr = explode(" ", $authHeader);

/*echo json_encode(array(
    "message" => "sd" .$arr[1]
));*/

$jwt = $arr[0];

if ($jwt) {

    try {

        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

        echo json_encode(array(
            "message" => "Access granted: " . $jwt
        ));
    } catch (Exception $e) {

        http_response_code(401);

        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }
}
