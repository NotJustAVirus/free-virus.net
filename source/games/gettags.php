<?php
include $_SERVER['DOCUMENT_ROOT']."/sqlinfo.php";


$conn = new mysqli($servername,$username,$password,$databasename);
if ($conn->connect_error) {
    die("Failed lol: " . $conn->connect_error);
}

$sql = "SELECT * FROM tags";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    $out = array();
    while($row = $result->fetch_assoc()) {
        $out[] = $row;
    }
}

echo json_encode($out);

$conn->close;
?>