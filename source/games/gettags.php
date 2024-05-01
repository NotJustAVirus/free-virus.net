<?php
include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";

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

?>