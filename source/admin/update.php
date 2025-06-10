<?php
session_start();

if ($_SESSION['authLevel'] != 1) {
    header('http/1.1 401 Unauthorized');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('http/1.1 404 Not Found');
    exit();
}

if (!isset($_GET['type'])) {
    header('http/1.1 400 Bad Request');
    echo 'Missing type';
    exit();
}

include $_SERVER['DOCUMENT_ROOT']."/dbConnect.php";


switch ($_GET['type']) {
    case 'update':
        requirePostFields(['path', 'title', 'description']);
        
        $path = $_POST['path'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        
        $sql = "UPDATE games SET title = ?, description = ? WHERE path = ?";
        $conn->execute_query($sql, [$title, $description, $path]);
        break;
    case 'delete':
        requirePostFields(['path']);
        
        $path = $_POST['path'];
        
        $sql = "DELETE FROM games WHERE path = ?";
        $conn->execute_query($sql, [$path]);
        break;
    case 'create':
        requirePostFields(['path', 'title', 'description']);
    
        $path = $_POST['path'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        
        $sql = "INSERT INTO games (path, title, description) VALUES (?, ?, ?)";
        $conn->execute_query($sql, [$path, $title, $description]);
        break;
    case 'createTag':
        requirePostFields(['name', 'color']);
        
        $name = $_POST['name'];
        $color = $_POST['color'];
        // remove # from color if it exists
        if (strpos($color, '#') === 0) {
            $color = substr($color, 1);
        }
        
        $sql = "INSERT INTO tags (name, color) VALUES (?, ?)";
        $conn->execute_query($sql, [$name, $color]);
        break;
    case 'deleteTag':
        requirePostFields(['name']);

        $name = $_POST['name'];

        $sql = "DELETE FROM tags WHERE name = ?";
        $conn->execute_query($sql, [$name]);
        break;
    case 'addTagToGame':
        requirePostFields(['game', 'tag']);

        $game = $_POST['game'];
        $tag = $_POST['tag'];

        $sql = "INSERT INTO game_tags (game_id, tag_id) VALUES (?, ?)";
        $conn->execute_query($sql, [$game, $tag]);
        break;
    case 'removeTagFromGame':
        requirePostFields(['name', 'path']);

        $name = $_POST['name'];
        $path = $_POST['path'];

        $sql = "DELETE FROM game_tags WHERE game_id = (SELECT id FROM games WHERE path = ?) AND tag_id = (SELECT id FROM tags WHERE name = ?)";
        $conn->execute_query($sql, [$path, $name]);
        break;
    default:
        header('http/1.1 400 Bad Request');
        echo 'Invalid type';
        exit();
}
function requirePostFields($list) {
    foreach ($list as $field) {
        if (!isset($_POST[$field])) {
            header('http/1.1 400 Bad Request');
            echo 'Missing required fields';
            echo "Required fields: ".implode(", ", $list);
            exit();
        }
    }
}

?>