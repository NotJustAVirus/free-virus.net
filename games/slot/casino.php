<?php
include $_SERVER['DOCUMENT_ROOT']."/sqlinfo.php";  

$conn = new mysqli($servername,$username,$password,$databasename);
if ($conn->connect_error) {
    die("Failed lol: " . $conn->connect_error);
}

if (!isset($_COOKIE["gambler"])) {
    $sql = "INSERT INTO `casino_user` () VALUES ()";
    $conn->query($sql);
    $id = $conn->insert_id;
    setcookie("gambler",$id);
} else {
    $id = $_COOKIE["gambler"];
}


$request = $_GET['type'];

if ($request == "money") {
    $sql = "SELECT `money` FROM `casino_user` WHERE `id`=$id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $money = $row["money"];
        echo $money;
    }
}


$conn->close;
?>