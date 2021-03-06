<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_user_id.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_put_data.php');
function updateChapter($id = 0)
{
    if (!is_numeric($id) || $id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }

    global $db;
    $_PUT = get_put_data();
    $title = $_PUT["title"];
    $icon_name = $_PUT["icon_name"];
    $color = $_PUT["color"];
    $course_id = $_PUT["course_id"];
    $user_id = get_user_id();
    $rank = $_PUT["rank"];
    $visibility = $_PUT["visibility"];
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('UPDATE chapters SET title=:title, icon_name=:icon_name, color=:color, course_id=:course_id, visibility=:visibility, rank=:rank, modified=:modified WHERE id=:id AND creator_id=:creator_id');
    $q->bindValue(':title', $title, PDO::PARAM_STR);
    $q->bindValue(':icon_name', $icon_name, PDO::PARAM_STR);
    $q->bindValue(':color', $color, PDO::PARAM_STR);
    $q->bindValue(':course_id', $course_id, PDO::PARAM_INT);
    $q->bindValue(':rank', $rank, PDO::PARAM_INT);
    $q->bindValue(':visibility', $visibility, PDO::PARAM_INT);
    $q->bindValue(':modified', $modified, PDO::PARAM_STR);
    $q->bindValue(':creator_id', $user_id, PDO::PARAM_INT);
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
