<?php
function get_title($url){
    $str = file_get_contents($url);
    if(strlen($str)>0){
        $str = trim(preg_replace('/\s+/', ' ', $str)); // supports line breaks inside <title>
        preg_match("/\<title\>(.*)\<\/title\>/i",$str,$title); // ignore case
        return $title[1];
    }
}

$sites = [
    "the-web.42web.io",
    // "torweb.dk",
    // "tvs2.dk",
    // "acki.dk",
    // "echochamber.dk",
    // "ottersofficial.dk",
    // "ceo-hansenberg.dk",
    // "tv11.dk",
    // "ddu-hbgym.dk"
];
?>
<div class="main">
    <div>
        <span>Links to other awsome sites:</span><br>
        <?php
        for ($i=0; $i < count($sites); $i++) { 
            $url = "http://".$sites[$i];
            $title = get_title($url);
            if (!$title || $title == "") $title = $sites[$i];
            echo "<a href='$url' target='_blank' rel='noopener noreferrer'>$title</a><br>\n";
        }
        ?>
        <br>
    </div>
    <div>
        <span>psst do you want to know how to use vs code to make html</span><br>
        <a href="https://docs.emmet.io/cheat-sheet/" target="_blank" rel="noopener noreferrer">cheat-sheet</a>
    </div>
    <div class="corner">
        <a href="https://github.com/ActuallyJustAVirus/free-virus.net/">View source code</a>
    </div>
    <img tabindex="0" src="Images/hotdog.png" alt="hotdog" id="hotdog">
</div>