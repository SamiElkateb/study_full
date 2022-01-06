<?php
function updateNavigation($id = 0)
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
    $ancestry = $_PUT["ancestry"];
    $lesson_id = $_PUT["lesson_id"];
    $visibility = $_PUT["visibility"];
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('UPDATE navigation SET title=:title, icon_name=:icon_name, ancestry=:ancestry, visibility=:visibility, lesson_id=:lesson_id, modified=:modified WHERE id=:id');
    $q->bindValue(':title', $title, PDO::PARAM_STR);
    $q->bindValue(':icon_name', $icon_name, PDO::PARAM_STR);
    $q->bindValue(':ancestry', $ancestry, PDO::PARAM_STR);
    $q->bindValue(':lesson_id', $lesson_id, PDO::PARAM_STR);
    $q->bindValue(':visibility', $visibility, PDO::PARAM_STR);
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
