<?php

if (!isset($url)) {
    die("\$url not set for header.php");
}

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

echo "<li class='nav'><a tabindex='1' class='menu skip-nav' href='javascript:document.getElementById('first').focus()'>Skip Navigation</a></li>";

if (isset($iscasino) && $iscasino) {
    echo "<li class='casino'><img src='/Images/coin.png' alt='coin'></li>\n";
    echo "<li class='casino'><div class='menu' id='money'>$money</div></li>\n";
}
echo "</ul>\n";

?>