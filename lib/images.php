<?php

namespace THEMENAME\Images;

// SVG support
add_filter('upload_mimes', __NAMESPACE__ . '\\cc_mime_types');
function cc_mime_types($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}

// add compressing level
add_filter( 'jpeg_quality', create_function( '', 'return 80;' ) );
