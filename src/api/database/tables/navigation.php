<?php
$q = $db->prepare(
    'CREATE TABLE IF NOT EXISTS navigation (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
        title varchar(255) NOT NULL, 
        icon_name varchar(255) NOT NULL, 
        ancestry varchar(255) NOT NULL, 
        lesson_id int(11) DEFAULT NULL,
        creator_id int(11) NOT NULL,
        visibility int(11) NOT NULL, 
        created timestamp NOT NULL DEFAULT current_timestamp(),
        modified timestamp NOT NULL DEFAULT "0000-00-00 00:00:00" 
    )'
);
$q->execute();