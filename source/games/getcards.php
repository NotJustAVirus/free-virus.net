<?php
include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";

$sql = "SELECT * FROM games";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // output data of each row
    $out = array();
    while($row = $result->fetch_assoc()) {
        $id = $row["id"];
        
        
        $sql = "SELECT tags.name, tags.color
        FROM (game_tags INNER join tags on game_tags.tag_id = tags.id)
        where game_id = '$id'";
        $tags = $conn->query($sql);
        
        $tag_list = array();
        while ($tag = $tags->fetch_assoc()) {
            $tag_list[] = $tag;
        } 
        $row["tags"] = $tag_list;
        
        $out[] = $row;
    }
}

echo json_encode($out);

?>