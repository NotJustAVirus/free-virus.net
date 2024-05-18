<?php 
$url = $_SERVER['REQUEST_URI'];
// echo $url;
$url = explode("?",$url)[0];
$url = urldecode($url);
$temp = explode("/",$url);
if (str_contains($temp[count($temp)-1],".")) {
    $temp = explode(".",$temp[count($temp)-1]);
    $fileExt = $temp[count($temp)-1];
} else {
    $fileExt = "";
}
switch ($fileExt) {
    case '':
        header("Content-Type: text/html");
        $phpurl = $_SERVER['DOCUMENT_ROOT'].$url."/index.php";
        $htmlurl = $_SERVER['DOCUMENT_ROOT'].$url."/index.html";
        $path = $_SERVER['DOCUMENT_ROOT'].$url; // this is for php files to include other files
        if (file_exists($phpurl)) {
            $index = $phpurl;
        } elseif (file_exists($htmlurl)) {
            $index = $htmlurl;
        } else {
            echo "404";
            header("HTTP/1.0 404 Not Found");
            exit();
        }
        include_once "servePage.php"; // this is for the head and stuff
        exit();
    case 'php':
        header("Content-Type: text/html");
        $phpurl = $_SERVER['DOCUMENT_ROOT'].$url;
        if (file_exists($phpurl)) {
            include_once $phpurl;
        } else {
            echo "404";
            header("HTTP/1.0 404 Not Found");
        }
        exit();
    case 'txt':
        header("Content-Type: text/plain");
        break;
    case 'html':
        header("Content-Type: text/html");
        break;
    case 'css':
        header("Content-Type: text/css");
        break;
    case 'js':
        header("Content-Type: text/javascript");
        break;
    case 'jpg':
        header("Content-Type: image/jpg");
        header("Cache-Control: max-age=31536000");
        break;
    case 'png':
        header("Content-Type: image/png");
        header("Cache-Control: max-age=31536000");
        break;
    case 'gif':
        header("Content-Type: image/gif");
        header("Cache-Control: max-age=31536000");
        break;
    case 'svg':
        header("Content-Type: image/svg+xml");
        break;
    case 'ico':
        header("Content-Type: image/x-icon");
        header("Cache-Control: max-age=31536000");
        break;
    case 'json':
        header("Content-Type: application/json");
        break;
    default:
        header("Content-Type: text/plain");
        break;
}
readFileRoot($url);

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