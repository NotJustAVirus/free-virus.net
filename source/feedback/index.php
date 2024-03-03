<!DOCTYPE html>
<html>
<head>
    <title>Feedback</title>
    <!-- <link rel="icon" href="jam.png" type="image/x-icon"> -->
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>
<body>
    <ul>
        <li><a class="menu" href="/">Home</a></li>
        <li><a class="menu" href="/games">Games</a></li>
        <li><a class="menu active" href="">Feedback</a></li>
        <!-- <li><a class="menu" href="#about">About</a></li> -->
        <li class="nav"><a tabindex="1" class="menu skip-nav" href="javascript:document.getElementById('feedback').focus()">Skip Navigation</a></li>
    </ul>
    <div class="main">
        <form method="post" action="">
            <!-- <input type="text" name="value" autocomplete="off"> -->
            <textarea id="feedback" name="feedback" rows="4" cols="50"></textarea><br>
            <input type="submit" value="Send feedback">
            <?php
            if (isset($_POST["feedback"])) {
                $fileplace = $path."feedback.txt";
                $input = $_POST["feedback"];
                $file = fopen($fileplace,"a");
                // date_default_timezone_set("Europe/Copenhagen");
                $input = date("G:i d-m-Y")."\n".$input."\n";
                fwrite($file,$input);
                fclose($file);
            }
            ?>
        </form>
    </div>
</body>