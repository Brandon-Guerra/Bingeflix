<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$ch = curl_init();

$show = seoUrl($_GET['show']);

curl_setopt($ch, CURLOPT_URL, "https://api-v2launch.trakt.tv/shows/".$show."?extended=full,images");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Content-Type: application/json",
  "trakt-api-version: 2",
  "trakt-api-key: 515757162fc4b28ab92049d333070b65cb7dd51b3341bbc93f7c1114fb9873ff"
));

$response = curl_exec($ch);
curl_close($ch);

echo ($response);

function seoUrl($string) {
    //Lower case everything
    $string = strtolower($string);
    //Make alphanumeric (removes all other characters)
    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
    //Clean up multiple dashes or whitespaces
    $string = preg_replace("/[\s-]+/", " ", $string);
    //Convert whitespaces and underscore to dash
    $string = preg_replace("/[\s_]/", "-", $string);
    return $string;
}

?>