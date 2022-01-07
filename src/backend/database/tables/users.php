<?php
$q = $db->prepare(
    'CREATE TABLE IF NOT EXISTS users (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
        email varchar(255) NOT NULL, 
        password varchar(255) NOT NULL, 
        created timestamp NOT NULL DEFAULT current_timestamp()
    )'
);
$q->execute();
