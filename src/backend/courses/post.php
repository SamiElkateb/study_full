<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_user_id.php');
function addCourse()
{
    global $db;

    $title = $_POST["title"];
    $icon_name = $_POST["icon_name"];
    $color = $_POST["color"];
    $user_id = get_user_id();
    $rank = $_POST["rank"];
    $visibility = $_POST["visibility"];
    $created = date('Y-m-d H:i:s');
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('INSERT INTO courses(title, icon_name, color, creator_id, rank, visibility, created, modified) VALUES (:title, :icon_name, :color, :creator_id, :rank, :visibility, :created, :modified)');
    $q->bindValue(':title', $title);
    $q->bindValue(':icon_name', $icon_name);
    $q->bindValue(':color', $color);
    $q->bindValue(':rank', $rank);
    $q->bindValue(':creator_id', $user_id);
    $q->bindValue(':visibility', $visibility);
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
