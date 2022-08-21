<?php
function choseword($file){
    $list = file($file);
    $word = strtolower($list[rand(0,count($list))]);
    return $word;
}
function printlines($word,$foundletters){
    $word = trim($word);
    $letters = str_split($word);
    $output = "";
    for ($i=0; $i < strlen($word); $i++) { 
        if (array_key_exists($letters[$i],$foundletters)) {
            $output .= $letters[$i];
        } else {
            $output .= "_";
        }
        $output .= " ";
    }
    return $output;
}
// function saveguesses($guesses){
//     $file = fopen("guesses.txt","w");
//     foreach ($guesses as $guess) {
//         fwrite($file,$guess."\n");
//     }
//     fclose($file);
// }
?>