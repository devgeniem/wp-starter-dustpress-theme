<?php

namespace THEMENAME\Assets;

/**
 * Return paths for assets
 */
function asset_path($filename) {

  $dist_path = get_template_directory_uri() . '/dist/';
  $directory = dirname($filename) . '/';
  $file = basename($filename);

  return $dist_path . $directory . $file;
}
