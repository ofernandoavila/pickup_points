<?php
/*
Plugin Name: Pickup Points for Woocommerce
Plugin URI: https://ofernandoavila.com/wordpress-plugins/
Description: Helping sellers in delivery
Author: Fernando Ávila
Author URI: https://ofernandoavila.com/
License: GPLv2 or later
*/
use Ofernandoavila\Pickup\Core\Bootstrap;

require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';
$bootstrap = new Bootstrap(__FILE__);

$bootstrap->init();