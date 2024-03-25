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
        if (file_exists($phpurl)) {
            $path = $_SERVER['DOCUMENT_ROOT'].$url; // this is for php files to include other files
            include_once "head.php";
            include_once "header.php";
            include_once $phpurl;
        } elseif (file_exists($htmlurl)) {
            readFileRoot($url."/index.html");
        } else {
            echo "404";
            header("HTTP/1.0 404 Not Found");
        }
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
        break;
    case 'png':
        header("Content-Type: image/png");
        break;
    case 'gif':
        header("Content-Type: image/gif");
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