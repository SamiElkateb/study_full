<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: authorization, origin, x-requested-with, content-type');
header('Access-Control-Max-Age: 36000');

include_once($_SERVER['DOCUMENT_ROOT'] . '/chapters/index.php');
