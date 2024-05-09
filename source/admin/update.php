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

if (!isset($_GET['type'])) {
    header('http/1.1 400 Bad Request');
    echo 'Missing type';
    exit();
}

include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";

if ($_GET['type'] == 'update') {
    requirePostFields(['path', 'title', 'description']);

    $path = $_POST['path'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    
    $sql = "UPDATE games SET title = ?, description = ? WHERE path = ?";
    $conn->execute_query($sql, [$title, $description, $path]);
} else if ($_GET['type'] == 'delete') {
    requirePostFields(['path']);
    
    $path = $_POST['path'];
    
    $sql = "DELETE FROM games WHERE path = ?";
    $conn->execute_query($sql, [$path]);
} else if ($_GET['type'] == 'create') {
    requirePostFields(['path', 'title', 'description']);

    $path = $_POST['path'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    
    $sql = "INSERT INTO games (path, title, description) VALUES (?, ?, ?)";
    $conn->execute_query($sql, [$path, $title, $description]);
} else {
    header('http/1.1 400 Bad Request');
    echo 'Invalid type';
    exit();
}

function requirePostFields($list) {
    foreach ($list as $field) {
        if (!isset($_POST[$field])) {
            header('http/1.1 400 Bad Request');
            echo 'Missing required fields';
            echo "Required fields: ".implode(", ", $list);
            exit();
        }
    }
}

?>