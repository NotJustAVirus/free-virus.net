<!DOCTYPE html>
<html>
<head>
    <title>Games</title>
    <link rel="icon" href="icon.png" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/style.css">
    <link rel="stylesheet" type="text/css" href="cardstyle.css">
</head>
<body>
    <ul>
        <li><a class="menu" href="/">Home</a></li>
        <li><a class="menu active" href=".">Games</a></li>
        <li><a class="menu" href="/feedback">Feedback</a></li>
        <!-- <li><a class="menu" href="#about">About</a></li> -->
        <li class="nav"><a tabindex="1" class="menu skip-nav" href="javascript:document.getElementById('first').focus()">Skip Navigation</a></li>
    </ul>
    <div class="main" id="main">
        <div class="row">
            <?php
            include $_SERVER['DOCUMENT_ROOT']."/sqlinfo.php";

            
            $conn = new mysqli($servername,$username,$password,$databasename);
            if ($conn->connect_error) {
                die("Failed lol: " . $conn->connect_error);
            }
            
            $sql = "SELECT * FROM games";
            if (isset($_GET['tag'])) {
                $sql = "SELECT games.path, games.title, games.description, games.id
                FROM ((game_tags
                INNER join games on game_tags.game_id = games.id)
                INNER join tags on game_tags.tag_id = tags.id)
                where LOWER(tags.name) LIKE '".$_GET['tag']."'";
            }
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    $title = $row["title"];
                    $description = $row["description"];
                    $path = $row["path"];
                    $id = $row["id"];
                    $sql = "SELECT tags.name, tags.color
                    FROM (game_tags INNER join tags on game_tags.tag_id = tags.id)
                    where game_id LiKE '$id'";
                    $tags = $conn->query($sql);
                    echo "<div class='column'>
                        <div class='card'>
                            <div class='top'>
                                <div class='text'>
                                    <a href='$path'><div class='title'>$title</div></a>
                                    <div class='description'>$description</div>
                                </div>
                                <a href='$path'>
                                    <div class='icon'>
                                        <img src='$path/icon.png' alt='$title'>
                                        <div class='overlay'></div>
                                        <!-- <div class='overlaytext'>Play!</div> -->
                                    </div>
                                </a>
                            </div>
                            <div class='taglist'>";
                            while ($tag = $tags->fetch_assoc()) {
                                $tag_name = $tag["name"];
                                $tag_color = $tag["color"];
                                echo "<a href='?tag=".strtolower($tag_name)."'><div style='color: #$tag_color;' class='tag'>$tag_name</div></a>";
                            }  
                            echo "
                            </div>
                        </div>
                    </div>";
                }
            }

            $conn->close;
            ?>
        </div>
    </div>
</body>