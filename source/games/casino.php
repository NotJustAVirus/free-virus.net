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
    $black = 350;
    $red = 250;
    $yellow = 100;
    $blue = 0;
    $green = 0;
    $cost = 100;

    $roll = rand(1,100);
    $money -= $cost;
    if ($roll > 93) {
        $money += $black;
        echo "black";
    } elseif ($roll > 74) {
        $money += $red;
        echo "red";
    } elseif ($roll > 50) {
        $money += $yellow;
        echo "yellow";
    } elseif ($roll > 25) {
        $money += $green;
        echo "green";
    } else {
        $money += $blue;
        echo "blue";
    }
    
    $sql = "UPDATE `casino_user` SET `money`"."="."$money WHERE `id`=$id";
    $conn->query($sql);
} elseif ($request == "play_rustwheel") {
    $bet = $_GET['bet'];
    $red = 20;
    $purple = 10;
    $blue = 5;
    $green = 3;
    $yellow = 1;
    $cost = 100;

    $roll = rand(1,25);
    $money -= $cost;
    $rolled = "";
    if ($roll == 25) {
        $rolled = "red";
    } elseif ($roll > 22) {
        $rolled = "purple";
    } elseif ($roll > 18) {
        $rolled = "blue";
    } elseif ($roll > 12) {
        $rolled = "green";
    } else {
        $rolled = "yellow";
    }
    echo $rolled;
    if ($bet == $rolled) {
        $money += $cost * ($$bet + 1);
    }

    $sql = "UPDATE `casino_user` SET `money`"."="."$money WHERE `id`=$id";
    $conn->query($sql);
}

$conn->close;
?>