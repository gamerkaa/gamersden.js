<?php

header('Content-Type: application/json');

$currentdir = dirname(__FILE__);
$jsonout = [];
$handle = opendir($currentdir);
while (($filename = readdir($handle))) {
    if (strrpos($filename, ".mp4")) $jsonout[] = $filename;
}
closedir($handle);
echo json_encode($jsonout);
unset($filename);
unset($handle);
unset($jsonout);