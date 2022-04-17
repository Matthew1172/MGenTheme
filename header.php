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


$response = array();
$callee_data = array(
    'dataset' => "V3"
);

//$api = new ApiCaller();
//$xml = $api->CallGetMxl($callee_data);
$api = '134.74.112.18';
$port = '1235';
$dataset = $callee_data['dataset'];

$endpoint = "/clefs";
$url = "http://$api:$port$endpoint?dataset=$dataset";
$xml =  file_get_contents($url);
$endpoint = "/keys";
$url = "http://$api:$port$endpoint?dataset=$dataset";
$xml =  file_get_contents($url);
$endpoint = "/times";
$url = "http://$api:$port$endpoint?dataset=$dataset";
$xml =  file_get_contents($url);
$endpoint = "/notes";
$url = "http://$api:$port$endpoint?dataset=$dataset";
$xml =  file_get_contents($url);

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

