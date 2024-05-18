<?php
include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";

$sql = "SELECT * FROM games";
$result = $conn->query($sql);

$gameFolder = $_SERVER['DOCUMENT_ROOT']."/games/";
$gameFolders = glob($gameFolder."*", GLOB_ONLYDIR);

for ($i = 0; $i < count($gameFolders); $i++) {
    $gameFolders[$i] = str_replace($gameFolder,"",$gameFolders[$i]);
}

$games = $result->fetch_all(MYSQLI_ASSOC);

for ($i = 0; $i < count($games); $i++) {
    $sql = "SELECT tag_id FROM game_tags WHERE game_id = ?";
    $result = $conn->execute_query($sql, [$games[$i]['id']]);
    $games[$i]['tags'] = $result->fetch_all(MYSQLI_ASSOC);
}

for ($i = 0; $i < count($games); $i++) {
    $games[$i]['inDatabase'] = true;
    if (in_array($games[$i]['path'], $gameFolders)) {
        unset($gameFolders[array_search($games[$i]['path'], $gameFolders)]);
        $games[$i]['exists'] = true;
    } else {
        $games[$i]['exists'] = false;
    }
}

foreach ($gameFolders as $folder) {
    $games[] = [
        'path' => $folder,
        'title' => '',
        'description' => '',
        'inDatabase' => false,
        'exists' => true
    ];
}

echo json_encode($games);

?>