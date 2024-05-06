<?php
session_start();

if ($_SESSION['authLevel'] != 1) {
    header('http/1.1 401 Unauthorized');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('http/1.1 404 Not Found');
    exit();
}

$path = $_POST['path'];
$title = $_POST['title'];
$description = $_POST['description'];

if (empty($path) || empty($title) || empty($description)) {
    header('http/1.1 400 Bad Request');
    exit();
}


include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";

$sql = "UPDATE games SET title = ?, description = ? WHERE path = ?";
$conn->execute_query($sql, [$title, $description, $path]);

?>