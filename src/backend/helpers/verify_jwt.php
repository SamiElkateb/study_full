<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
header('Access-Control-Allow-Origin: http://' . getenv('HOST_IP') . ':3000');

use \Firebase\JWT\JWT;

function verify_jwt()
{
    $secret_key = getenv("JWT_SECRET");
    $jwt = null;

    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];

    $arr = explode(" ", $authHeader);

    $jwt = $arr[1];
    if ($jwt) {

        try {

            $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

            /* $response = array(
                'ok' => true,
                'status' => 200,
                'message' => 'Access granted.',
                'jwt' => $jwt
            );
            echo json_encode($response, JSON_PRETTY_PRINT); */
            return $decoded;
        } catch (Exception $e) {

            http_response_code(401);
            $response = array(
                'ok' => false,
                'status' => 401,
                'message' => 'Access denied.',
                "error" => $e->getMessage()
            );
            echo json_encode($response, JSON_PRETTY_PRINT);
            exit;
        }
    }

    http_response_code(401);
    $response = array(
        'ok' => false,
        'status' => 401,
        'message' => 'Access denied.'
    );
    echo json_encode($response, JSON_PRETTY_PRINT);
    exit;
}
