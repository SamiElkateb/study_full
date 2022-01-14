<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/verify_jwt.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/chapters/get.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/chapters/post.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/chapters/put.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/chapters/delete.php');
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getChapter($id);
        } else if (!empty($_GET["course_id"])) {
            $course_id = intval($_GET["course_id"]);
            getChaptersByCourseId($course_id);
        } else {
            getChapters();
        }
        break;
    case 'POST':
        addChapter();
        break;
    case 'PUT':
        $id = intval($_GET["id"]);
        updateChapter($id);
        break;
    case 'DELETE':
        $id = intval($_GET["id"]);
        deleteChapter($id);
        break;
    case 'OPTIONS':
        verify_jwt();
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        break;
    default:
        header("HTTP/1.0 406 Method Not Allowed");
        break;
}
