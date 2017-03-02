<?php

// use dustpress
dustpress();

$includes = [
    'lib/assets.php',    // Scripts and stylesheets
    'lib/extras.php',    // Custom functions
    'lib/setup.php',     // Theme setup
    'lib/images.php',    // image functions
];
foreach ( $includes as $file ) {
    if ( ! $filepath = locate_template( $file ) ) {
        trigger_error( sprintf( __( 'Error locating %s for inclusion', 'themename' ), $file ), E_USER_ERROR );
    }
    require_once $filepath;
}
unset( $file, $filepath );