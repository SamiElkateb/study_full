<?php
$q = $db->prepare(
    'CREATE TABLE IF NOT EXISTS cards (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
        question varchar(255) NOT NULL, 
        answer mediumtext NOT NULL, 
        answer_type varchar(255) NOT NULL, 
        lesson_id int(11) NOT NULL, 
        created timestamp NOT NULL DEFAULT current_timestamp(), 
        modified timestamp NOT NULL DEFAULT "0000-00-00 00:00:00"
    )'
);
$q->execute();
