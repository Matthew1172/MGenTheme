<?php
/*
 * API Caller class. Responsible for send and receiving data from the Flask server.
 *
 * @package MGen
 * @subpackage mgen
 * @since 1.0.0
 */

if ( ! class_exists('ApiCaller') ) :
    class ApiCaller
    {
        const API_URL = '134.74.112.18';
        const API_PORT = '1234';

        public function __construct(){

        }

        // Method: POST, PUT, GET etc
        // Data: array("param" => "value") ==> index.php?param=value
        function CallPredict($method, $url, $data = false)
        {
            $curl = curl_init();

            switch ($method)
            {
                case "POST":
                    curl_setopt($curl, CURLOPT_POST, 1);

                    if ($data)
                        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                    break;
                default:
                    if ($data)
                        $url = sprintf("%s?%s", $url, http_build_query($data));
            }

            // Optional Authentication:
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
            //curl_setopt($curl, CURLOPT_USERPWD, "username:password");

            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

            $result = curl_exec($curl);

            curl_close($curl);

            return $result;
        }

        // Method: POST, PUT, GET etc
        // Data: array("param" => "value") ==> index.php?param=value
        function CallGetMxl($data = false)
        {
            $api = self::API_URL;
            $endpoint = "/mxl";
            $port = self::API_PORT;
            $folder = $data['folder'];
            $file = $data['file'];
            $url = "http://$api:$port$endpoint?folder=$folder&file=$file";
            return file_get_contents($url);
        }

    }
endif; // ApiCaller class