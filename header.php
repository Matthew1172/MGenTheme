<?php

/**
 * Header file.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package MGen
 * @subpackage mgen
 * @since 1.0.0
 */



$api = '134.74.112.18';
$endpoint = "/midi";
$port = '1234';
$folder = "output@WedApr61452382022";
$file = "generated_1.mid";
$url = "http://$api:$port$endpoint?folder=$folder&file=$file";

$xml =  file_get_contents($url);
echo $xml;

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MGen</title>
    <?php wp_head(); ?>
</head>

<body>

