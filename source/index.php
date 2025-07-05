<?php
function get_title($url){
    set_error_handler(function() { /* ignore errors */ });
    $str = file_get_contents($url);
    restore_error_handler();
    if(strlen($str)>0){
        $str = trim(preg_replace('/\s+/', ' ', $str)); // supports line breaks inside <title>
        preg_match("/\<title\>(.*)\<\/title\>/i",$str,$title); // ignore case
        return $title[1];
    }
}

$sites = [
    "pawzd.net",
    "itnerd.dk",
    "suoweb.net",
    "itnerd.net",
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
    <div class="center-text">
        <h1>hi o/</h1>
        <!-- <h1>hi :D</h1> -->
        <!-- <h1>hi :)</h1> -->
    </div>
    <div class="columns">
        <div class="column">
            <div class="text">
                <p>This website is a test ground for me to make whatever I want. Which means random games and tools.</p>
                <br>
                <p>Here are some of my other websites:</p>
                <a href="http://brick.free-virus.net" target="_blank" rel="noopener noreferrer">Brick Simulator</a>
                <br>
                <p>Other websites made by other cool people i know:</p>
                <a href="http://pawzd.net" target="_blank" rel="noopener noreferrer">Pawzd</a><br>
                <a href="http://itnerd.dk" target="_blank" rel="noopener noreferrer">ITNerd.dk</a><br>
                <a href="http://suoweb.net" target="_blank" rel="noopener noreferrer">suoweb.net</a><br>
                <a href="http://itnerd.net" target="_blank" rel="noopener noreferrer">itnerd.net</a><br>
                <a href="http://the-web.42web.io" target="_blank" rel="noopener noreferrer">The-Web</a><br>
                <?php
                // for ($i=0; $i < count($sites); $i++) { 
                //     $url = "http://".$sites[$i];
                //     $title = get_title($url);
                //     if (!$title || $title == "") $title = $sites[$i];
                //     echo "<a href='$url' target='_blank' rel='noopener noreferrer'>$title</a><br>\n";
                // }
                ?>
            </div>
        </div>
        <div class="column">
            <br>
            <div class="skull-container">
                <div class="top-skull">
                    <img class="skull-img" src="Images/redskull.png" alt="skull logo">
                </div>
                <div class="skull">
                    <img class="skull-img" src="Images/redskull.png" alt="skull logo">
                    <div class="shadow"></div>
                </div>
            </div>
        </div>
    </div>
    <img tabindex="0" src="Images/hotdog.png" alt="hotdog" id="hotdog">
</div>