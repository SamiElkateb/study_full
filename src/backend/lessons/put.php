<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_user_id.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_put_data.php');
function updateLesson($id = 0)
{
    if (!is_numeric($id) || $id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }

    global $db;
    $_PUT = get_put_data();
    $title = $_PUT["title"];
    $chapter_id = $_PUT["chapter_id"];
    $rank = $_PUT["rank"];
    $user_id = get_user_id();
    $visibility = $_PUT["visibility"];
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('UPDATE lessons SET title=:title, chapter_id=:chapter_id, visibility=:visibility, rank=:rank, modified=:modified WHERE id=:id AND creator_id=:creator_id');
    $q->bindValue(':title', $title, PDO::PARAM_STR);
    $q->bindValue(':chapter_id', $chapter_id, PDO::PARAM_INT);
    $q->bindValue(':rank', $rank, PDO::PARAM_INT);
    $q->bindValue(':visibility', $visibility, PDO::PARAM_INT);
    $q->bindValue(':modified', $modified, PDO::PARAM_STR);
    $q->bindValue(':user_id', $user_id, PDO::PARAM_STR);
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
