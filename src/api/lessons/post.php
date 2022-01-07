<?php
function addLesson()
{
    global $db;
    $title = $_POST["title"];
    $creator_id = $_POST["creator_id"];
    $chapter_id = $_POST["chapter_id"];
    $rank = $_POST["rank"];
    $visibility = $_POST["visibility"];
    $created = date('Y-m-d H:i:s');
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('INSERT INTO lessons(title, creator_id, chapter_id, rank, visibility, created, modified) VALUES (:title, :creator_id, :chapter_id, :rank, :visibility, :created, :modified)');
    $q->bindValue(':title', $title);
    $q->bindValue(':rank', $rank);
    $q->bindValue(':creator_id', $creator_id);
    $q->bindValue(':chapter_id', $chapter_id);
    $q->bindValue(':visibility', $visibility);
    $q->bindValue(':created', $created);
    $q->bindValue(':modified', $modified);

    if($q->execute()){
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Added successfully.'
        );
    }else{
        $response = array(
            'ok' => false,
            'status' => 500,
            'message' => 'ERROR: ' . $q->errorCode()
        );
    }

    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
}
