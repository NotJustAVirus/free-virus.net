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