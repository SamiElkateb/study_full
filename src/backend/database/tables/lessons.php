<?php
$q = $db->prepare(
    'CREATE TABLE IF NOT EXISTS lessons (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
        title varchar(255) NOT NULL,
        chapter_id int(11) NOT NULL,
        creator_id int(11) NOT NULL,
        rank int(11) NOT NULL,
        visibility int(11) NOT NULL, 
        created timestamp NOT NULL DEFAULT current_timestamp(),
        modified timestamp NOT NULL DEFAULT "0000-00-00 00:00:00" 
    )'
);
$q->execute();