<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/verify_jwt.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/lessons/get.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/lessons/post.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/lessons/put.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/lessons/delete.php');
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['last_update_date'])) {
            getLessonsSinceLastUpdate();
        } else if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getLesson($id);
        } else if (!empty($_GET["course_id"])) {
            $course_id = intval($_GET["course_id"]);
            getLessonsByChapterId($course_id);
        } else {
            getLessons();
        }
        break;
    case 'POST':
        addLesson();
        break;
    case 'PUT':
        $id = intval($_GET["id"]);
        updateLesson($id);
        break;
    case 'DELETE':
        $id = intval($_GET["id"]);
        deleteLesson($id);
        break;
    case 'OPTIONS':
        verify_jwt();
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        break;
    default:
        header("HTTP/1.0 406 Method Not Allowed");
        break;
}
