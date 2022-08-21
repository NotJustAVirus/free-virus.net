<?php
$servername = "sql104.epizy.com";
$username = "epiz_30852052";
$password = "YkQMN4wKvyCA";
$databasename = "epiz_30852052_tictactoe";


$conn = new mysqli($servername,$username,$password,$databasename);
if ($conn->connect_error) {
    die("Failed lol: " . $conn->connect_error);
}
echo "Connected successfully";


$conn->close;
/* prosidual
    $conn = mysqli_connect($servername,$username,$password);
    if (!$conn) {
        die("fail lol: ".mysqli_connect_error());
    }
    echo "Connected successfully";
*/
?>