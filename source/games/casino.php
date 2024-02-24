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
    setcookie(
        "gambler",
        $id,
        time() + (365 * 24 * 60 * 60) // 1 year
    );
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
    } elseif ($roll > 64) {
        $money += $win;
        echo 1;
    } else {
        echo 0;
    }
    
    $sql = "UPDATE `casino_user` SET `money`"."="."$money WHERE `id`=$id";
    $conn->query($sql);
} elseif ($request == "play_luckywheel") {
    $black = 1000;
    $yellow = 200;
    $blue = 100;
    $green = 50;
    $red = 0;
    $cost = 100;

    $roll = rand(1,100);
    $money -= $cost;
    if ($roll > 96) {
        $money += $black;
        echo "black";
    } elseif ($roll > 64) {
        $money += $yellow;
        echo "yellow";
    } elseif ($roll > 32) {
        $money += $blue;
        echo "blue";
    } elseif ($roll > 10) {
        $money += $green;
        echo "green";
    } else {
        echo "red";
    }
    
    $sql = "UPDATE `casino_user` SET `money`"."="."$money WHERE `id`=$id";
    $conn->query($sql);
} elseif ($request == "play_rustwheel") {
    $red = 20;
    $purple = 10;
    $blue = 5;
    $green = 3;
    $yellow = 1;
    $cost = 100;

    $roll = rand(1,25);
    $money -= $cost;
    if ($roll == 25) {
        $money += $cost * ($red + 1);
        echo "red";
    } elseif ($roll > 22) {
        $money += $cost * ($purple + 1);
        echo "purple";
    } elseif ($roll > 18) {
        $money += $cost * ($blue + 1);
        echo "blue";
    } elseif ($roll > 12) {
        $money += $cost * ($green + 1);
        echo "green";
    } else {
        $money += $cost * ($yellow + 1);
        echo "yellow";
    }

    $sql = "UPDATE `casino_user` SET `money`"."="."$money WHERE `id`=$id";
    $conn->query($sql);
}

$conn->close;
?>