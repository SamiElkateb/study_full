<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
header('Access-Control-Allow-Origin: http://' . getenv('HOST_IP') . ':3000');

function register()
{
    global $db;
    $email = $_POST["email"];
    $password_hash = password_hash($_POST["password"], PASSWORD_BCRYPT);
    $created = date('Y-m-d H:i:s');

    $q = $db->prepare('INSERT INTO users(email, password, created) VALUES (:email, :password, :created)');
    $q->bindValue(':email', $email, PDO::PARAM_STR);
    $q->bindValue(':password', $password_hash, PDO::PARAM_STR);
    $q->bindValue(':created', $created, PDO::PARAM_STR);

    if ($q->execute()) {
        http_response_code(200);
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Registration successful.'
        );
    } else {
        http_response_code(400);
        $response = array(
            'ok' => false,
            'status' => 500,
            'message' => 'ERROR: ' . $q->errorCode()
        );
    }

    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
}
register();
