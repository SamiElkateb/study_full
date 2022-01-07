<?php
$q = $db->prepare(
    'CREATE TABLE IF NOT EXISTS study_data (
        id int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL, 
        user_id int(11) NOT NULL, 
        card_id int(11) NOT NULL, 
        streak int(11) NOT NULL,
        next_study_date timestamp NOT NULL DEFAULT "0000-00-00 00:00:00"
    )'
);
$q->execute();
