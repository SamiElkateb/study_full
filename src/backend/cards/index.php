<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/cards/get.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/cards/post.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/cards/put.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/cards/delete.php');
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getCard($id);
        }else if (!empty($_GET["lesson_id"])) {
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
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
