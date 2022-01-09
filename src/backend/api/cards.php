<?php
header('Access-Control-Allow-Origin: http://' . getenv('HOST_IP') . ':3000');
include_once($_SERVER['DOCUMENT_ROOT'] . '/cards/index.php');
