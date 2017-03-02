<?php
/**
 * Image setup file.
 */

namespace THEMENAME\Images;

/**
 * Add SVG support.
 *
 * @param array $mimes The accepted mime types.
 *
 * @return mixed
 */
function cc_mime_types( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';

    return $mimes;
}
\add_filter( 'upload_mimes', __NAMESPACE__ . '\\cc_mime_types' );

// Add compressing level.
\add_filter( 'jpeg_quality', create_function( '', 'return 80;' ) );
