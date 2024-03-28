<!DOCTYPE html>
<html>
<?php

if (!isset($path)) {
    die("\$path not set for in servePage.php");
}

if (!isset($url)) {
    die("\$url not set for in servePage.php");
}

$title = "Free-virus.net";
$icon = "icon.png";
$style = ["style.css"];
$script = ["script.js"];
$header = [];


if (!file_exists($path.$icon)) {
    $icon = "/".$icon;
}

if (file_exists($path."config")) {
    $configContent = file_get_contents($path."config");
    $config = explode("\n",$configContent);
    foreach ($config as $line) {
        $line = explode(":",$line);
        switch ($line[0]) {
            case "style":
                $style[] = $line[1];
                break;
            case "script":
                $script[] = $line[1];
                break;
            case "title":
                $title = $line[1];
                break;
            case "header":
                $header[] = $line[1];
                break;
            case "casino":
                $iscasino = true;
                break;
            case "icon":
                $icon = $line[1];
                break;
        }
    }
}

?>

<head>
    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <?php
    // <meta charset="utf-8">
    // <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    echo "<title>$title</title>\n";
    echo "<link rel=\"icon\" href=\"$icon\" type=\"image/png\">\n";
    foreach ($style as $s) {
        if (file_exists($path.$s)) {
            echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"$s\">\n";
        }
    }
    foreach ($script as $s) {
        if (file_exists($path.$s)) {
            echo "<script src=\"$s\"></script>\n";
        }
    }
    foreach ($header as $h) {
        echo "$h\n";
    }
    ?>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>
<body>
<?php

$selected = "/".explode("/", $url)[1];

$tabs = [
    "Home" => "/",
    "Games" => "/games",
    "Feedback" => "/feedback",
    // "About" => "/about",
];
echo "<ul>\n";
foreach ($tabs as $tab => $taburl) {
    $active = "";
    if ($selected == $taburl) {
        $active = " active";
    }
    echo "<li><a class='menu$active' href='$taburl'>$tab</a></li>\n";
}

echo "<li class='nav'><a tabindex='1' class='menu skip-nav' href='javascript:document.getElementById(\"first\").focus()'>Skip Navigation</a></li>\n";

if (isset($iscasino) && $iscasino) {
    echo "<li class='casino'><img src='/Images/coin.png' alt='coin'></li>\n";
    echo "<li class='casino'><div class='menu' id='money'>";
    // include_once "games/casino.php?type=money";
    echo "</div></li>\n";
}
echo "</ul>\n";
?>
<div class="main-content">
<?php
include_once $index;
?>
</div>
<footer>
    <h1>Free-Virus.net</h1>
    <h3>By JustAVirus</h3>
    <div class="contact">
        <span><a href="https://github.com/ActuallyJustAVirus/free-virus.net"><img height="40" src="Images/github/github-mark-white.png" srcset="/Images/github/github-mark-white.svg" alt="github logo"></a></span>
    </div>
</footer>
</body>
</html>