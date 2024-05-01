<?php
session_start();
header('HTTP/1.1 401 Unauthorized');

if (isset($_POST['username']) && isset($_POST['password'])) {
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    try {
        include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";
        $sql = "SELECT * FROM user WHERE username = ?";
        $result = $conn->execute_query($sql, [$username]);
    } catch (Exception $e) {
        echo 'Error: database query failed';
        exit();
    }

    if ($user = $result->fetch_assoc()) {
        $hash = $user['password'];
        if (password_verify($password, $hash)) {
            header('HTTP/1.1 200 OK');
            $_SESSION['username'] = $username;
            $_SESSION['authLevel'] = $user['authLevel'];
            echo 'success';
            exit();
        } else {
            echo 'Invalid username or password';
        }
    } else {
        echo 'No user found';
    }
} else {
    echo 'Username and password not provided';
}

?>