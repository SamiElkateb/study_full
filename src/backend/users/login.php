<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
header('Access-Control-Allow-Origin: http://' . getenv('HOST_IP') . ':3000');

use \Firebase\JWT\JWT;

function login()
{
    global $db;
    $email = $_POST["email"];
    $password = $_POST["password"];

    $q = $db->prepare('SELECT * FROM users WHERE email=:email LIMIT 1');
    $q->bindValue(':email', $email, PDO::PARAM_STR);
    $q->execute();
    $num = $q->rowCount();

    if ($num > 0) {
        $row = $q->fetch(PDO::FETCH_ASSOC);
        $id = $row['id'];
        $email = $row['email'];
        $password_db = $row['password'];

        if (password_verify($password, $password_db)) {
            $secret_key = getenv("JWT_SECRET");
            $issuer_claim = getenv("JWT_ISSUER");
            $audience_claim = getenv("JWT_AUDIENCE");
            $now = new DateTimeImmutable();
            $issued_at_claim = $now->getTimestamp();
            $expire = $now->modify('+100 minutes')->getTimestamp();
            $not_before_claim = $now->getTimestamp();
            $token = array(
                "iss" => $issuer_claim,
                "aud" => $audience_claim,
                "iat" => $issued_at_claim,
                "nbf" => $not_before_claim,
                'exp'  => $expire,
                "data" => array(
                    "id" => $id,
                    "email" => $email
                )
            );

            http_response_code(200);

            $jwt = JWT::encode($token, $secret_key);
            $response = array(
                'ok' => true,
                'status' => 200,
                'message' => 'Login successful.',
                'jwt' => $jwt,
                'id' => $id
            );
            header('Content-Type: application/json');
            echo json_encode($response, JSON_PRETTY_PRINT);
            return;
        }
    }

    $response = array(
        'ok' => false,
        'status' => 401,
        'message' => 'Login failed.',
    );

    http_response_code(401);
    echo json_encode($response, JSON_PRETTY_PRINT);
}
login();
