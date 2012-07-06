<?php
/*
Plugin Name: Syntax Highlighter Button
Plugin URI: http://imatlas.com/
Description: 给Wordpress的编辑器增加插入Syntax Highlighter代码的按钮
Version: 1.0
Author: imatlas
Author URI: http://imatlas.com/
*/

function insert_code_button(){
    if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
            return;
    }
    $plugin_name = dirname(__FILE__);
    $plugin_name = substr($plugin_name, strripos($plugin_name,'/plugins') + strlen('/plugins'));
    $stylesheet = get_option( 'siteurl' ) . '/wp-content/plugins' . $plugin_name . '/css/style.css';
    add_editor_style( $stylesheet ); 
    add_filter( 'mce_external_plugins', 'add_highlight_button_plugin' );
    add_filter( 'mce_buttons', 'register_highlight_button' );
}
    
function register_highlight_button( $buttons ) {
    array_push( $buttons, "|", "highlight" );
    return $buttons;
}

function add_highlight_button_plugin(){
    $plugin_name = dirname(__FILE__);
    $plugin_name = substr($plugin_name, strripos($plugin_name,'/plugins') + strlen('/plugins'));
    $plugin_array['highlight'] = get_option( 'siteurl' ) . '/wp-content/plugins' . $plugin_name . '/js/highlight.js';
    return $plugin_array;
}

add_action('admin_init', 'insert_code_button');

?>
