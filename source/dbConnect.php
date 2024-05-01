<?php
include $_SERVER['DOCUMENT_ROOT']."/sqlinfo.php";

$conn = new mysqli(
    $database_servername,
    $database_username,
    $database_password,
    $database_name);
if ($conn->connect_error) {
    die("Failed lol: " . $conn->connect_error);
}
?>