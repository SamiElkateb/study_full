<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_user_id.php');
function addStudy()
{
    global $db;
    $user_id = get_user_id();
    $flashcard_id = $_POST["flashcard_id"];
    $next_study_date = $_POST["next_study_date"];
    $streak = $_POST["streak"];
    $created = date('Y-m-d H:i:s');
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('INSERT INTO study(user_id, flashcard_id, next_study_date, streak, created, modified) VALUES (:user_id, :flashcard_id, :next_study_date, :streak, :created, :modified)');
    $q->bindValue(':user_id', $user_id);
    $q->bindValue(':flashcard_id', $flashcard_id);
    $q->bindValue(':next_study_date', $next_study_date);
    $q->bindValue(':streak', $streak);
    $q->bindValue(':created', $created);
    $q->bindValue(':modified', $modified);

    if ($q->execute()) {
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Added successfully.'
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
