<?php
/**
 * Functions and definitions
 *
 * @package MGen
 * @subpackage mgen
 * @since 1.0.0
 */


/**
 * First, let's set the maximum content width based on the theme's design and stylesheet.
 * This will limit the width of all uploaded images and embeds.
 */
if ( ! isset( $content_width ) )
    $content_width = 800; /* pixels */

if ( ! function_exists( 'mgen_setup' ) ) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which runs
     * before the init hook. The init hook is too late for some features, such as indicating
     * support post thumbnails.
     */
    function mgen_setup() {

        /**
         * Make theme available for translation.
         * Translations can be placed in the /languages/ directory.
         */
        load_theme_textdomain( 'mgen', get_template_directory() . '/languages' );

        /**
         * Add default posts and comments RSS feed links to &lt;head>.
         */
        add_theme_support( 'automatic-feed-links' );

        /**
         * Enable support for post thumbnails and featured images.
         */
        add_theme_support( 'post-thumbnails' );

        /**
         * Add support for two custom navigation menus.
         */
        register_nav_menus( array(
            'primary'   => __( 'Primary Menu', 'mgen' ),
            'secondary' => __('Secondary Menu', 'mgen' )
        ) );

        /**
         * Enable support for the following post formats:
         * aside, gallery, quote, image, and video
         */
        add_theme_support( 'post-formats', array ( 'aside', 'gallery', 'quote', 'image', 'video' ) );
    }
endif; // mgen_setup
add_action( 'after_setup_theme', 'mgen_setup' );

/*
 *
 * Hook into css and js
 *
 */
function index_style_enqueue()
{
    $theme_version = wp_get_theme()->get( 'Version' );
    wp_enqueue_style( 'mgenStyle', get_stylesheet_uri(), array(), $theme_version );

}
add_action('wp_enqueue_scripts', 'index_style_enqueue');

function index_script_enqueue()
{

    wp_enqueue_script('osmdJS', get_template_directory_uri() . '/inc/opensheetmusicdisplay.min.js', array('jquery'));
    wp_enqueue_script('osmdpJS', get_template_directory_uri() . '/inc/OsmdAudioPlayer.min.js', array('jquery'));
    wp_enqueue_script('appJS', get_template_directory_uri() . '/inc/js/app.js', array('jquery'), '1.0', true);
    wp_enqueue_script('configJS', get_template_directory_uri() . '/inc/js/config.js', array('jquery'), '1.0', false);
    wp_enqueue_script('predictJS', get_template_directory_uri() . '/inc/js/predictSong.js', array('jquery'), '1.0', true);

    wp_localize_script('configJS', 'mgen', array(
        'url' => admin_url('admin-ajax.php')
    ));
}
add_action('wp_enqueue_scripts', 'index_script_enqueue');


/*
 *
 * Function to reset user first and last name
 *
 */
function get_mxl()
{
    $response = array();
    $callee_data = array(
        'folder' => esc_attr($_POST['folder']),
        'file' => esc_attr($_POST['file'])
    );

    //$api = new ApiCaller();
    //$xml = $api->CallGetMxl($callee_data);
    $api = '134.74.112.18';
    $endpoint = "/test-generate";
    $port = '1235';
    $folder = $callee_data['folder'];
    $file = $callee_data['file'];
    $url = "http://$api:$port$endpoint?folder=$folder&file=$file";

    $xml =  file_get_contents($url);
    if($xml === false){
        $response['scoreXml'] = $url;
        $response['r'] = "Bad";
    }else{
        $response['scoreXml'] = base64_encode($xml);
        $response['r'] = "Good";
    }
    wp_send_json($response);
}
add_action('wp_ajax_call_get_mxl', 'get_mxl');

/*
 *
 * Function to reset user first and last name
 *
 * req = {
    dataset: "Good"
    input_clef: "Clef G"
    input_key: "Key 2"
    input_seq: "Note C 1.0"
    input_time: "Time 4 4"
    length: 100
    random_clef: False
    random_key: False
    random_seq: False
    random_seq_length: 1
    random_time: False
    songs: 1
    temperature: 0.85
}
 *
 */
function run_model()
{
    $api = '134.74.112.18';
    $endpoint = "/predict";
    $port = '1235';
    $url = "http://$api:$port$endpoint";

    $callee_data = array(
        'dataset' => esc_attr($_POST['dataset']),
        'input_clef' => esc_attr($_POST['input_clef']),
        'input_key' => esc_attr($_POST['input_key']),
        'input_seq' => esc_attr($_POST['input_seq']),
        'input_time' => esc_attr($_POST['input_time']),
        'length' => esc_attr($_POST['length']),
        'random_clef' => esc_attr($_POST['random_clef']),
        'random_key' => esc_attr($_POST['random_key']),
        'random_seq' => esc_attr($_POST['random_seq']),
        'random_seq_length' => esc_attr($_POST['random_seq_length']),
        'random_time' => esc_attr($_POST['random_time']),
        'songs' => esc_attr($_POST['songs']),
        'temperature' => esc_attr($_POST['temperature']),
    );

    // use key 'http' even if you send the request to https://...
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($callee_data)
        )
    );
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) { /* Handle error */ }
    $result = json_decode($result, true);
    /*
result = {
            "midi": [
                "output@SatApr92240102022",
                "generated_1.mid"
            ],
            "mxl": [
                "output@SatApr92240102022",
                "generated_1.mxl"
            ]
        }
     */
    $temp = $result['mxl'];
    $folder = $temp[0];
    $file = $temp[1];
    $endpoint = "/test-generate";
    $url = "http://$api:$port$endpoint?folder=$folder&file=$file";
    $xml =  file_get_contents($url);
    if($xml === false){
        $response['scoreXml'] = $url;
        $response['r'] = "Bad";
    }else{
        $response['scoreXml'] = base64_encode($xml);
        $response['r'] = "Good";
    }
    wp_send_json($response);
}
add_action('wp_ajax_call_run_model', 'run_model');
//for non authenticated users
add_action('wp_ajax_nopriv_call_run_model', 'run_model');

/*
 *     $folder = $temp[0];
    $file = $temp[1];
    $url = "http://$api:$port$endpoint?folder=$folder&file=$file";
    $xml =  file_get_contents($url);
    if($xml === false){
        $response['scoreXml'] = $url;
        $response['r'] = "Bad";
    }else{
        $response['scoreXml'] = base64_encode($xml);
        $response['r'] = "Good";
    }
    wp_send_json($response);
 */