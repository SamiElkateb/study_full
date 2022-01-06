<?php
function updateCard($id = 0)
{
    if (!is_numeric($id) || $id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }

    global $db;
    $_PUT = array();
    parse_str(file_get_contents('php://input'), $_PUT);
    $question = $_PUT["question"];
    $answer = $_PUT["answer"];
    $answer_type = $_PUT["answer_type"];
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('UPDATE cards SET question=:question, answer=:answer, answer_type=:answer_type, modified=:modified WHERE id=:id');
    $q->bindValue(':question', $question, PDO::PARAM_STR);
    $q->bindValue(':answer', $answer, PDO::PARAM_STR);
    $q->bindValue(':answer_type', $answer_type, PDO::PARAM_STR);
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
