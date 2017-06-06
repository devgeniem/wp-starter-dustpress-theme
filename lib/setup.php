<?php
/**
 * Theme setup functions.
 */

namespace THEMENAME\Setup;

// Define the asset path.
if ( ! defined( 'ASSET_PATH' ) ) {
    define( 'ASSET_PATH', \get_template_directory_uri() . '/assets/dist' );
}

/**
 * Theme setup.
 */
function setup() {
    // Make theme available for translation
    \load_theme_textdomain( 'themename-textdomain', get_template_directory() . '/lang' );
    // Enable plugins to manage the document title
    // http://codex.wordpress.org/Function_Reference/add_theme_support#Title_Tag
    \add_theme_support( 'title-tag' );
    // Register wp_nav_menu() menus
    // http://codex.wordpress.org/Function_Reference/register_nav_menus
    \register_nav_menus( [
        'primary_navigation' => __( 'Primary Navigation', 'themename-textdomain' ),
    ] );
    // Enable post thumbnails
    // http://codex.wordpress.org/Post_Thumbnails
    // http://codex.wordpress.org/Function_Reference/set_post_thumbnail_size
    // http://codex.wordpress.org/Function_Reference/add_image_size
    \add_theme_support( 'post-thumbnails' );
    // Enable post formats
    // http://codex.wordpress.org/Post_Formats
    // add_theme_support('post-formats', ['aside', 'gallery', 'link', 'image', 'quote', 'video', 'audio']);
    // Enable HTML5 markup support
    // http://codex.wordpress.org/Function_Reference/add_theme_support#HTML5
    \add_theme_support( 'html5', [ 'caption', 'comment-form', 'comment-list', 'gallery', 'search-form' ] );
    // Use main stylesheet for visual editor
    // To add custom styles edit /assets/styles/layouts/_tinymce.scss
    \add_editor_style( ASSET_PATH . '/styles/main.css' );
}
\add_action( 'after_setup_theme', __NAMESPACE__ . '\\setup' );

/**
 * Theme assets.
 */
function assets() {
    $version    = wp_get_theme()->get( 'Version' );
    \wp_enqueue_style( 'theme-css', ASSET_PATH . '/main.css', [], $version, 'all' );
    \wp_enqueue_script( 'theme-js', ASSET_PATH . '/main.js', [ 'jquery' ], $version, true );
}

\add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\assets', 100 );

/**
 * Disable emojis.
 */
function disable_emojis() {
    \remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    \remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    \remove_action( 'wp_print_styles', 'print_emoji_styles' );
    \remove_action( 'admin_print_styles', 'print_emoji_styles' );
    \remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    \remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    \remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    add_filter( 'tiny_mce_plugins', __NAMESPACE__ . '\\disable_emojis_tinymce' );
}
\add_action( 'init', __NAMESPACE__ . '\\disable_emojis' );

/**
 * Removes the emoji plugin from tinymce.
 *
 * @param  array $plugins Installed tinymce plugins.
 * @return array
 */
function disable_emojis_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, [ 'wpemoji' ] );
    } else {
        return [];
    }
}

/**
 * Start cleanup.
 */
function start_cleanup() {
    // Initialize the cleanup
    \add_action( 'init', __NAMESPACE__ . '\\cleanup_head' );
}
\add_action( 'after_setup_theme', __NAMESPACE__ . '\\start_cleanup' );

/**
 *  WordPress cleanup function.
 */
function cleanup_head() {
    // EditURI link
    \remove_action( 'wp_head', 'rsd_link' );
    // Category feed links
    \remove_action( 'wp_head', 'feed_links_extra', 3 );
    // Post and comment feed links
    \remove_action( 'wp_head', 'feed_links', 2 );
    // Windows Live Writer
    \remove_action( 'wp_head', 'wlwmanifest_link' );
    // Index link
    \remove_action( 'wp_head', 'index_rel_link' );
    // Previous link
    \remove_action( 'wp_head', 'parent_post_rel_link', 10 );
    // Start link
    \remove_action( 'wp_head', 'start_post_rel_link', 10 );
    // Canonical
    \remove_action( 'wp_head', 'rel_canonical', 10 );
    // Shortlink
    \remove_action( 'wp_head', 'wp_shortlink_wp_head', 10 );
    // Links for adjacent posts
    \remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10 );
    // WP version
    \remove_action( 'wp_head', 'wp_generator' );
    // rest api link
    \remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
    // embed links
    \remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );
    // Remove oEmbed-specific JavaScript from the front-end and back-end.
    \remove_action( 'wp_head', 'wp_oembed_add_host_js' );
}
