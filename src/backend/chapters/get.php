<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_user_id.php');

function getChapters()
{
    global $db;
    $user_id = get_user_id();
    $q = $db->prepare('SELECT * FROM chapters WHERE creator_id=:creator_id OR visibility=1');
    $q->bindValue(':creator_id', $user_id, PDO::PARAM_INT);
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

function getChapter($id = 0)
{
    if (!is_numeric($id) || $id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }
    global $db;
    $user_id = get_user_id();
    $q = $db->prepare('SELECT * FROM chapters WHERE id=:id AND (creator_id=:creator_id OR visibility=1) LIMIT 1');
    $q->bindValue(':creator_id', $user_id, PDO::PARAM_INT);
    $q->bindValue(':id', $id, PDO::PARAM_INT);
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

function getChaptersByCourseId($course_id = 0)
{
    if (!is_numeric($course_id) || $course_id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }
    global $db;
    $user_id = get_user_id();
    $q = $db->prepare('SELECT * FROM chapters WHERE course_id=:course_id AND (creator_id=:creator_id OR visibility=1)');
    $q->bindValue(':creator_id', $user_id, PDO::PARAM_INT);
    $q->bindValue(':course_id', $course_id, PDO::PARAM_INT);
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
