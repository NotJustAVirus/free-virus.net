<?php 
$url = $_SERVER['REQUEST_URI'];
// echo $url;
$url = explode("?",$url)[0];
$url = urldecode($url);
$fileType = pathinfo($url, PATHINFO_EXTENSION);
switch ($fileType) {
    case 'css':
        header("Content-Type: text/css");
        readFileRoot($url);
        break;
    case 'js':
        header("Content-Type: text/javascript");
        readFileRoot($url);
        break;
    case 'jpg':
        header("Content-Type: image/jpg");
        readFileRoot($url);
        break;
    case 'png':
        header("Content-Type: image/png");
        readFileRoot($url);
        break;
    case 'gif':
        header("Content-Type: image/gif");
        readFileRoot($url);
        break;
    case 'php':
        header("Content-Type: text/html");
        $phpurl = $_SERVER['DOCUMENT_ROOT'].$url;
        if (file_exists($phpurl)) {
            include $phpurl;
        } else {
            echo "404";
            header("HTTP/1.0 404 Not Found");
        }
        break;
    case '':
        
        header("Content-Type: text/html");
        $phpurl = $_SERVER['DOCUMENT_ROOT'].$url."/index.php";
        $htmlurl = $_SERVER['DOCUMENT_ROOT'].$url."/index.html";
        if (file_exists($phpurl)) {
            $path = $_SERVER['DOCUMENT_ROOT'].$url;
            include $phpurl;
        } elseif (file_exists($htmlurl)) {
            include $htmlurl;
        } else {
            echo "404";
            header("HTTP/1.0 404 Not Found");
        }
    default:
        
        readFileRoot($url);
        break;
}

function readFileRoot($url){
    $root = $_SERVER['DOCUMENT_ROOT'];
    $file = $root.$url;
    if (file_exists($file)) {
        readfile($file);
    } else {
        echo "File not found";
        header("HTTP/1.0 404 Not Found");
    }
}
?>