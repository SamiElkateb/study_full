<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_user_id.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_put_data.php');
function updateStudy($id = 0)
{
    if (!is_numeric($id) || $id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }

    global $db;
    $_PUT = get_put_data();
    $user_id = get_user_id();
    $flashcard_id = $_PUT["flashcard_id"];
    $next_study_date = $_PUT["next_study_date"];
    $streak = $_PUT["streak"];
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('UPDATE study SET flashcard_id=:flashcard_id, next_study_date=:next_study_date, streak=:streak, modified=:modified WHERE id=:id AND user_id=:user_id');
    $q->bindValue(':user_id', $user_id, PDO::PARAM_STR);
    $q->bindValue(':flashcard_id', $flashcard_id, PDO::PARAM_STR);
    $q->bindValue(':next_study_date', $next_study_date, PDO::PARAM_STR);
    $q->bindValue(':streak', $streak);
    $q->bindValue(':modified', $modified, PDO::PARAM_STR);
    $q->bindValue(':id', $id, PDO::PARAM_INT);

    if ($q->execute()) {
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Updated successfully.'
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
