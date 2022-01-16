<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/verify_jwt.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/study/get.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/study/post.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/study/put.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/study/delete.php');
$request_method = $_SERVER["REQUEST_METHOD"];
switch ($request_method) {
    case 'GET':
        if (!empty($_GET['last_update_date'])) {
            getStudySinceLastUpdate();
        } else if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getStudy($id);
        } else {
            getStudies();
        }
        break;
    case 'POST':
        addStudy();
        break;
    case 'PUT':
        $id = intval($_GET["id"]);
        updateStudy($id);
        break;
    case 'DELETE':
        $id = intval($_GET["id"]);
        deleteStudy($id);
        break;
    case 'OPTIONS':
        verify_jwt();
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
