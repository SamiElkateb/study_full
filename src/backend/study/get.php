<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_user_id.php');

function getStudies()
{
    global $db;
    $user_id = get_user_id();
    $q = $db->prepare('SELECT * FROM study WHERE user_id=:user_id');
    $q->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    if ($q->execute()) {
        $responseData = [];
        while ($data = $q->fetch(PDO::FETCH_ASSOC)) {
            array_push($responseData, $data);
        }
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Transaction successful.',
            'data' => $responseData
        );
    } else {
        $response = array(
            'ok' => false,
            'status' => 500,
            'message' => 'ERROR: ' . $q->errorCode()
        );
    }
    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
}

function getStudy($id = 0)
{
    if (!is_numeric($id) || $id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }
    global $db;
    $user_id = get_user_id();
    $q = $db->prepare('SELECT * FROM study WHERE id=:id AND user_id=:user_id LIMIT 1');
    $q->bindValue(':id', $id, PDO::PARAM_INT);
    $q->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    if ($q->execute()) {
        $responseData = $q->fetch(PDO::FETCH_ASSOC);
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Transaction successful.',
            'data' => $responseData
        );
    } else {
        $response = array(
            'ok' => false,
            'status' => 500,
            'message' => 'ERROR: ' . $q->errorCode()
        );
    }

    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
}
function getStudySinceLastUpdate()
{
    global $db;
    $user_id = get_user_id();
    $last_update_date = $_GET['last_update_date'];
    $q = $db->prepare('SELECT * FROM study WHERE user_id=:user_id modified > :last_update_date');
    $q->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $q->bindValue(':last_update_date', $last_update_date, PDO::PARAM_INT);
    if ($q->execute()) {
        $responseData = [];
        while ($data = $q->fetch(PDO::FETCH_ASSOC)) {
            array_push($responseData, $data);
        }
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Transaction successful.',
            'data' => $responseData
        );
    } else {
        $response = array(
            'ok' => false,
            'status' => 500,
            'message' => 'ERROR: ' . $q->errorCode()
        );
    }
    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
}
