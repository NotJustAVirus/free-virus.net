<?php
include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";

$sql = "SELECT * FROM games";
$result = $conn->query($sql);

echo json_encode($result->fetch_all(MYSQLI_ASSOC));

?>