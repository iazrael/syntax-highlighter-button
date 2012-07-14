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
    add_filter( 'mce_external_plugins', 'add_highlight_button_plugin' );
    add_filter( 'mce_buttons', 'register_highlight_button' );
    // not work
    // add_filter( 'mce_css', 'add_highlight_button_style' );
}
    
function register_highlight_button( $buttons ) {
    array_push( $buttons, "|", "highlight" );
    return $buttons;
}

function add_highlight_button_style($mce_css ){
    if ( ! empty( $mce_css ) )
        $mce_css .= ',';
    $mce_css .= plugins_url( 'css/style.css', __FILE__ );
    return $mce_css;
}

function add_highlight_button_plugin(){
    $plugin_array['highlight'] =  plugins_url('js/highlight.js', __FILE__);
    return $plugin_array;
}

add_action('admin_init', 'insert_code_button');

?>