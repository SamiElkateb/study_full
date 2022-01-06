<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/navigation/get.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/navigation/post.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/navigation/put.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/navigation/delete.php');
$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        if (!empty($_GET["id"])) {
            $id = intval($_GET["id"]);
            getNavigation($id);
        }else if (!empty($_GET["ancestry"])) {
            $ancestry = $_GET["ancestry"];
            getNavigationByAncestry($ancestry);
        } else {
            getNavigations();
        }
        break;
    case 'POST':
        addNavigation();
        break;
    case 'PUT':
        $id = intval($_GET["id"]);
        updateNavigation($id);
        break;
    case 'DELETE':
        $id = intval($_GET["id"]);
        deleteNavigation($id);
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
