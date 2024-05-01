<?php
session_start();
header('HTTP/1.1 401 Unauthorized');

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === 'admin' && $password === 'admin') {
        $_SESSION['username'] = $username;
        $_SESSION['authLevel'] = 1;
        header('HTTP/1.1 200 OK');
    } else {
        echo 'Invalid username or password';
    }
} else {
    echo 'Username and password not provided';
}

?>