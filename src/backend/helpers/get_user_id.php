<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/helpers/verify_jwt.php');
function get_user_id()
{
    $jwt = verify_jwt();
    $user_id = $jwt->data->id;
    return $user_id;
}
