<?php

function get_put_data()
{
    $_PUT = json_decode(file_get_contents("php://input"), true);
    if (is_array($_PUT) and count($_PUT) > 1) return $_PUT;

    $_PUT = array();
    parse_str(file_get_contents('php://input'), $_PUT);
    if (is_array($_PUT) and count($_PUT) > 1) return $_PUT;
}
