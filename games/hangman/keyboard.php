<?php
function keycolored($guesses,$letters){
    $aletters = str_split($letters);
    foreach ($aletters as $letter) {
        $keyboard[$letter] = 0;
    }
    foreach ($guesses as $guess => $color) {
        if (array_key_exists($guess,$keyboard)) {
            $keyboard[$guess] = $color;
        }
    }
    return $keyboard;
}
function printrow($colored,$key,$front){
    $output = '<span class="';
    $i=0;
    foreach ($colored as $value) {
        if ($value == 1) {
            $color = "marked";
        } elseif ($value == 2) {
            $color = "grey";
        } elseif ($value == 3) {
            $color = "good";
        } else {
            $color = "normal";
        }
        if ($i == count($colored)-1) {
            $output .=$color.'">'.$key.'</span>';
        } elseif ($i == 0) {
            $output .=$color.'">'.$front.$key.'</span><span class="';
        } else {
            $output .=$color.'">'.$key.'</span><span class="';
        }
        $i++;
    }
    return $output;
}
function printrowwithletters($colored,$first,$other,$front){
    $output = '<span class="';
    $i=0;
    foreach ($colored as $letter => $value) {
        if ($value == 1) {
            $color = "marked";
        } elseif ($value == 2) {
            $color = "grey";
        } elseif ($value == 3) {
            $color = "good";
        } else {
            $color = "normal";
        }
        if ($i == count($colored)-1) {
            $output .=$color.'">'.$first.$letter.$other.'</span>';
        } elseif ($i == 0) {
            $output .=$color.'">'.$front.$first.$letter.$other.'</span><span class="';
        } else {
            $output .=$color.'">'.$first.$letter.$other.'</span><span class="';
        }
        $i++;
    }
    return $output;
}
function printkeyrow($guesses,$letters,$top,$start){
    $coloredkeys = keycolored($guesses,$letters);
    if ($top) {
        echo printrow($coloredkeys,"_____ "," ");
        echo "<br>";
    }
    echo $start;
    echo printrowwithletters($coloredkeys,"│","  ││","│");
    echo "<br>";
    echo $start;
    echo printrow($coloredkeys,"│___││","│");
    echo "<br>";
    echo $start;
    echo printrow($coloredkeys,"╱___╲│","│");
    echo "<br>";
}
printkeyrow($guesses,"qwertyuiop",TRUE,"");
printkeyrow($guesses,"asdfghjkl",FALSE,"  ");
printkeyrow($guesses,"zxcvbnm",FALSE,"     ");
//" _____ "
//"││___││"
//"│╱___╲│"
//$keyboard = keycolored(["a"]);
//echo '<span class="whitetext">My Name is:</span>&nbsp;<span class="redtext">Tintincute</span>';
?>
