<?php
include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";

$sql = "SELECT * FROM tags";
$result = $conn->query($sql);

$tags = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($tags);

?>