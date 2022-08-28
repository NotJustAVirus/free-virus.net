<!DOCTYPE html>
<html>
<head>
    <title>Games</title>
    <!-- <link rel="icon" href="jam.png" type="image/x-icon"> -->
    <link rel="stylesheet" type="text/css" href="/style.css">
    <link rel="stylesheet" type="text/css" href="cardstyle.css">
</head>
<body>
    <ul>
        <li><a class="menu" href="/">Home</a></li>
        <li><a class="menu active" href="">Games</a></li>
        <li><a class="menu" href="/feedback">Feedback</a></li>
        <!-- <li><a class="menu" href="#about">About</a></li> -->
        <li class="nav"><a tabindex="1" class="menu skip-nav" href="javascript:document.getElementById('first').focus()">Skip Navigation</a></li>
    </ul>
    <div class="main" id="main">
        <div class="row">
            <!-- <div class="column">
                <a href="hangman" id="first">
                    <div class="card">
                        <img src="hangman/hangman.png" alt="Hangman">
                        <div class="title">Hangman</div>
                        <div class="overlay"></div>
                    </div>
                </a>
            </div> -->
            <?php
            include $_SERVER['DOCUMENT_ROOT']."/sqlinfo.php";
            
            
            $conn = new mysqli($servername,$username,$password,$databasename);
            if ($conn->connect_error) {
                die("Failed lol: " . $conn->connect_error);
            }
            
            $sql = "SELECT * FROM games";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                $title = $row["title"];
                $path = $row["path"];
                echo '<div class="column">
                    <a href="'.$path.'">
                        <div class="card">
                            <img src="'.$path.'/icon.png" alt="'.$title.' icon">
                            <div class="title">'.$title.'</div>
                            <div class="overlay"></div>
                        </div>
                    </a>
                </div>';
            }
            }

            $conn->close;
            ?>
        </div>
    </div>
</body>