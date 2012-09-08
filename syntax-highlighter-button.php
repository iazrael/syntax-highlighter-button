<?php
/*
Plugin Name: Syntax Highlighter Button
Plugin URI: http://imatlas.com/posts/quick-code-button-wordpress/
Description: 给Wordpress的编辑器增加插入Syntax Highlighter代码的按钮
Version: 1.3
Author: imatlas
Author URI: http://imatlas.com/
*/

/*  Copyright 2012  imatlas  (email : atlas@imatlas)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
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