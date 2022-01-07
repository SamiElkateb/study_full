<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/courses/get.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/courses/post.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/courses/put.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/courses/delete.php');
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        if (!empty($_GET["id"])) {
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
    default:
        header("HTTP/1.0 406 Method Not Allowed");
        break;
}
