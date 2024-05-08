<?php

$gameFolder = $_SERVER['DOCUMENT_ROOT']."/games/";
$games = glob($gameFolder."*", GLOB_ONLYDIR);

for ($i = 0; $i < count($games); $i++) {
    $games[$i] = str_replace($gameFolder,"",$games[$i]);
}

echo json_encode($games);


?>