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

/**
 * Add and update image sizes for theme images.
 *
 * @return void
 */
function image_sizes() {

	/**
	 * These are examples.
	 * Add your own and delete these when developing the theme.
	 */

	/**
	// Update medium size.
	update_option( 'medium_size_w', 320 );
	update_option( 'medium_size_h', 9999 );

	// Update medium_large size.
	update_option( 'medium_large_size_w', 768 );
	update_option( 'medium_large_size_h', 9999 );

	// Update large size.
	update_option( 'large_size_w', 1024 );
	update_option( 'large_size_h', 9999 );

	// Add custom image sizes.
	add_image_size( 'fullhd', 1920, 9999 );
	*/
}

// Hook the image_sizes function to after_setup_theme.
\add_action( 'after_setup_theme', __NAMESPACE__ . '\\image_sizes' );
