<?php
/**
 * Extra theme functionalities.
 */

namespace THEMENAME\Extras;

use THEMENAME\Setup;

/**
 * Add <body> classes
 *
 * @param array $classes Body class strings.
 *
 * @return array
 */
function body_class( $classes ) {
    // Add page slug if it doesn't exist
    if ( \is_single() || \is_page() && ! \is_front_page() ) {
        if ( ! in_array( basename( get_permalink() ), $classes ) ) {
            $classes[] = basename( get_permalink() );
        }
    }

    return $classes;
}

\add_filter( 'body_class', __NAMESPACE__ . '\\body_class' );
