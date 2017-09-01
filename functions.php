<?php
/**
 * Initialize the theme settings loading.
 */

// Use dustpress
dustpress();

// Require all function files under /lib.
$lib_path = dirname( __FILE__ ) . '/lib/';

// List your /lib files here.
$includes = [
    'extras.php', // Custom functions
    'setup.php',  // Theme setup
    'images.php', // Image functions
];

// Loop through the includes and require them as part of the functions.
foreach ( $includes as $file ) {
    $file_path = $lib_path . $file;
    if ( is_file( $file_path ) ) {
        require $file_path;
    }
}
