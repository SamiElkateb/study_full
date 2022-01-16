<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/verify_jwt.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/courses/get.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/courses/post.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/courses/put.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/courses/delete.php');
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        if (!empty($_GET['last_update_date'])) {
            getCoursesSinceLastUpdate();
        } else if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getCourse($id);
        } else {
            getCourses();
        }
        break;
    case 'POST':
        addCourse();
        break;
    case 'PUT':
        $id = intval($_GET["id"]);
        updateCourse($id);
        break;
    case 'DELETE':
        $id = intval($_GET["id"]);
        deleteCourse($id);
        break;
    case 'OPTIONS':
        verify_jwt();
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        break;
    default:
        header("HTTP/1.0 406 Method Not Allowed");
        break;
}
