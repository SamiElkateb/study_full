<?php
$q = $db->prepare(
    'CREATE TABLE IF NOT EXISTS chapters (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
        title varchar(255) NOT NULL, 
        icon_name varchar(255) NOT NULL,
        color varchar(255) NOT NULL,
        course_id int(11) NOT NULL,
        creator_id int(11) NOT NULL,
        rank int(11) NOT NULL,
        visibility int(11) NOT NULL, 
        created timestamp NOT NULL DEFAULT current_timestamp(),
        modified timestamp NOT NULL DEFAULT "0000-00-00 00:00:00" 
    )'
);
$q->execute();