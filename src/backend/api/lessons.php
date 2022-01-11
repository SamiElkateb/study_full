<?php
header('Access-Control-Allow-Origin: http://' . getenv('HOST_IP') . ':3000');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: origin, x-requested-with, content-type');
header('Access-Control-Max-Age: 36000');
include_once($_SERVER['DOCUMENT_ROOT'] . '/lessons/index.php');
