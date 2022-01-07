<?php
function updateCourse($id = 0)
{
    if (!is_numeric($id) || $id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }

    global $db;
    $_PUT = array();
    parse_str(file_get_contents('php://input'), $_PUT);
    $title = $_PUT["title"];
    $icon_name = $_PUT["icon_name"];
    $rank = $_PUT["rank"];
    $visibility = $_PUT["visibility"];
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('UPDATE courses SET title=:title, icon_name=:icon_name, visibility=:visibility, rank=:rank, modified=:modified WHERE id=:id');
    $q->bindValue(':title', $title, PDO::PARAM_STR);
    $q->bindValue(':icon_name', $icon_name, PDO::PARAM_STR);
    $q->bindValue(':rank', $rank, PDO::PARAM_INT);
    $q->bindValue(':visibility', $visibility, PDO::PARAM_INT);
    $q->bindValue(':modified', $modified, PDO::PARAM_STR);
    $q->bindValue(':id', $id, PDO::PARAM_INT);

    if($q->execute()){
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Updated successfully.'
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
