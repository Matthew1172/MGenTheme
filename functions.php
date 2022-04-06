<?php
/**
 * Functions and definitions
 *
 * @package MGen
 * @subpackage mgen
 * @since 1.0.0
 */

/*
 *
 * Hook into css and js
 *
 */
function index_style_enqueue()
{
    $theme_version = wp_get_theme()->get( 'Version' );

}
add_action('wp_enqueue_scripts', 'index_style_enqueue');

function index_script_enqueue()
{

    wp_enqueue_script('osmdJS', get_template_directory_uri() . '/inc/opensheetmusicdisplay.min.js', array('jquery'));
    wp_enqueue_script('osmdpJS', get_template_directory_uri() . '/inc/OsmdAudioPlayer.min.js', array('jquery'));
    wp_enqueue_script('appJS', get_template_directory_uri() . '/inc/js/app.js', array('jquery'), '1.0', false);
}
add_action('wp_enqueue_scripts', 'index_script_enqueue');
