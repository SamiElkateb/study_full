<?php
function addCard()
{
    global $db;
    $question = $_POST["question"];
    $answer = $_POST["answer"];
    $answer_type = $_POST["answer_type"];
    $lesson_id = $_POST["lesson_id"];
    $created = date('Y-m-d H:i:s');
    $modified = date('Y-m-d H:i:s');

    $q = $db->prepare('INSERT INTO cards(question, answer, answer_type, lesson_id, created, modified) VALUES (:question, :answer, :answer_type, :lesson_id, :created, :modified)');
    $q->bindValue(':question', $question);
    $q->bindValue(':answer', $answer);
    $q->bindValue(':answer_type', $answer_type);
    $q->bindValue(':lesson_id', $lesson_id);
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
