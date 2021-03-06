<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/verify_jwt.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/flashcards/get.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/flashcards/post.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/flashcards/put.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/flashcards/delete.php');
$request_method = $_SERVER["REQUEST_METHOD"];
switch ($request_method) {
    case 'GET':
        if (!empty($_GET['last_update_date'])) {
            getCardsSinceLastUpdate();
        } else if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getCard($id);
        } else if (!empty($_GET["lesson_id"])) {
            $lesson_id = intval($_GET["lesson_id"]);
            getCardByLessonId($lesson_id);
        } else {
            getCards();
        }
        break;
    case 'POST':
        addCard();
        break;
    case 'PUT':
        $id = intval($_GET["id"]);
        updateCard($id);
        break;
    case 'DELETE':
        $id = intval($_GET["id"]);
        deleteCard($id);
        break;
    case 'OPTIONS':
        verify_jwt();
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
