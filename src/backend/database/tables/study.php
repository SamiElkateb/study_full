<?php
$q = $db->prepare(
    'CREATE TABLE IF NOT EXISTS study (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
        user_id varchar(255) NOT NULL, 
        flashcard_id mediumtext NOT NULL, 
        next_study_date varchar(255) NOT NULL, 
        streak int(11) NOT NULL, 
        created timestamp NOT NULL DEFAULT current_timestamp(), 
        modified timestamp NOT NULL DEFAULT "0000-00-00 00:00:00"
    )'
);
$q->execute();
