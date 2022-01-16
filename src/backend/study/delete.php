<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/get_user_id.php');
function deleteStudy($id = 0)
{
    if (!is_numeric($id) || $id === 0) {
        header("HTTP/1.0 422 Unprocessable Entity");
        return;
    }
    global $db;
    $user_id = get_user_id();
    $q = $db->prepare('DELETE FROM study WHERE id=:id AND user_id=:user_id  LIMIT 1');
    $q->bindValue(':id', $id, PDO::PARAM_INT);
    $q->bindValue(':user_id', $user_id, PDO::PARAM_INT);

    if ($q->execute()) {
        $response = array(
            'ok' => true,
            'status' => 200,
            'message' => 'Deleted successfully.'
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
