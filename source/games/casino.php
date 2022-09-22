<?php
include $_SERVER['DOCUMENT_ROOT']."/sqlinfo.php";  

function getmoney($id, $conn){
    $sql = "SELECT `money` FROM `casino_user` WHERE `id`=$id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $money = $row["money"];
        return $money;
    }
}

//conect
$conn = new mysqli($servername,$username,$password,$databasename);
if ($conn->connect_error) {
    die("Failed lol: " . $conn->connect_error);
}

//make sure there is an id
if (!isset($_COOKIE["gambler"])) {
    $sql = "INSERT INTO `casino_user` () VALUES ()";
    $conn->query($sql);
    $id = $conn->insert_id;
    setcookie("gambler",$id);
} else {
    $id = $_COOKIE["gambler"];
}

$request = $_GET['type'];
$money = getmoney($id,$conn);

if ($request == "money") {
    echo $money;
} elseif ($request == "play_slot") {
    $jackpot = 1000;
    $win = 250;
    $cost = 100;

    $roll = rand(1,100);
    $money -= $cost;
    if ($roll == 100) {
        $money += $jackpot;
        echo 2;
    } elseif ($roll > 70) {
        $money += $win;
        echo 1;
    } else {
        echo 0;
    }
    
    $sql = "UPDATE `casino_user` SET `money`"."="."$money WHERE `id`=$id";
    $conn->query($sql);
}

$conn->close;
?>