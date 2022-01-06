<?php
$server = getenv("DATABASE_DNS");
$username = getenv("DATABASE_USER");
$password = getenv("DATABASE_PASSWORD");
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES => false
);
$db = new PDO($server, $username, $password, $options);

require $_SERVER['DOCUMENT_ROOT'] . '/database/db_initialize.php';