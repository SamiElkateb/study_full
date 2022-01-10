<?php
// FOR DEV ONLY
include_once($_SERVER['DOCUMENT_ROOT'] . '/database/db_connect.php');

$q = $db->prepare('DELETE FROM courses');
$q->execute();
$q = $db->prepare('DELETE FROM chapters');
$q->execute();
$q = $db->prepare('DELETE FROM lessons');
$q->execute();
$q = $db->prepare('DELETE FROM cards');
$q->execute();
