<!DOCTYPE html>
<!-- what are you looking at -->
<html>
<head>
    <title>Hangman</title>
    <link rel="icon" href="icon.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/style.css">
    <link rel="stylesheet" type="text/css" href="hangstyle.css">
    <meta charset="utf-8">
</head>
<body>
    <ul>
        <li><a class="menu" href="/">Home</a></li>
        <li><a class="menu" href="/games">Games</a></li>
        <li><a class="menu" href="/feedback">Feedback</a></li>
        <li class="nav"><a tabindex="1" class="menu skip-nav" href="#main">Skip Navigation</a></li>
    </ul>
    <div class="normal main">
        <?php
        include "functions.php";
        
        
        $allwordsfile = "onlylong.txt";
        $cooked = $_COOKIE["guesses"];
        $guesses = [];
        for ($i=0; $i < strlen($cooked); $i+=2) { 
            $key = substr($cooked,$i,1);
            $value = substr($cooked,$i+1,1);
            $guesses[$key] = $value;
        }
        //var_dump($guesses);
        
        if (isset($_POST['reset'])) {
            $word = trim(choseword($allwordsfile));
            setcookie("word",$word);
            $guesses = ["-"=>2," "=>2];
            $letters = str_split("qwertyuiopasdfghjklzxcvbnm");
            while (!(count($guesses) >= 6)) {
                $rnd = $letters[array_rand($letters)];
                if (!array_key_exists($rnd,$guesses) && !in_array($rnd,str_split($word))) {
                    $guesses[$rnd] = 2;
                }
            }
        } elseif (!isset($_COOKIE["word"])) {
            $word = trim(choseword($allwordsfile));
            setcookie("word",$word);
            $guesses = ["-"=>2," "=>2];
            $letters = str_split("qwertyuiopasdfghjklzxcvbnm");
            while (!(count($guesses) >= 6)) {
                $rnd = $letters[array_rand($letters)];
                if (!array_key_exists($rnd,$guesses) && !in_array($rnd,str_split($word))) {
                    $guesses[$rnd] = 2;
                }
            }
        } else {
            $word =  $_COOKIE["word"];
        }

        if (isset($_POST["value"])) {
            $inputs = str_split(strtolower($_POST["value"]));
            foreach ($inputs as $input) {
                if (!array_key_exists($input,$guesses) && $input!="") {
                    if (in_array($input,str_split($word))) {
                        $guesses[$input] = 3;
                    } else {
                        $guesses[$input] = 1;
                    }
                }
            }
            //var_dump($guesses);
            $cookie="";
            foreach ($guesses as $key => $value) {
                $cookie.=$key.$value;
            }
            // var_dump($cookie);
            setcookie("guesses",$cookie);
        }
        
        ?>
        <p>
            <pre><span class="normal"><?php echo printlines($word,$guesses); ?></span></pre>
        </p>
        <form method="POST" name="myForm" id="myForm">
            <input type="text" autofocus name="value" autocomplete="off" id="myInput" oninput="myFunction()">
            <input type="submit" name="reset" value="New word">
        </form>
        <select id="mySelect" onchange="">
        <option value="Words">Words
        <option value="Sentences">Sentences
        </select>
        <script>
        function myFunction() {
        document.getElementById("myForm").submit();
        }
        </script>
        <div>
            <p>
                <pre><?php include_once "keyboard.php"; ?></pre>
            </p>
        </div>
        <div class="hangman"><img src="man/<?php
        $out = 0;
        foreach ($guesses as $val) {
            if ($val == 1) {
                $out++;
            }
        }
        if ($out > 6) $out = 6;
        echo $out;
        ?>hang.png" alt="hangman"></div>
    </div>
</body>
</html>