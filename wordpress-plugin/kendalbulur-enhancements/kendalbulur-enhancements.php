<?php
/**
 * Plugin Name: Kendalbulur Website Enhancements
 * Description: Fitur modular untuk website Desa Kendalbulur tanpa mengganti theme, header, footer, atau style global WordPress.
 * Version: 0.1.0
 * Author: KKM Kendalbulur
 * Text Domain: kendalbulur-enhancements
 */
if (!defined('ABSPATH')) exit;

define('KBE_VERSION','0.1.0');
define('KBE_FILE',__FILE__);
define('KBE_DIR',plugin_dir_path(__FILE__));
define('KBE_URL',plugin_dir_url(__FILE__));

require_once KBE_DIR.'includes/class-kbe-content.php';
require_once KBE_DIR.'includes/class-kbe-settings.php';
require_once KBE_DIR.'includes/class-kbe-shortcodes.php';

add_action('plugins_loaded', function(){
    KBE_Content::init();
    KBE_Settings::init();
    KBE_Shortcodes::init();
});

register_activation_hook(__FILE__, function(){
    KBE_Content::register_post_types();
    flush_rewrite_rules();
});

register_deactivation_hook(__FILE__, function(){
    flush_rewrite_rules();
});
