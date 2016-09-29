<?php

class MiddleModel extends \DustPress\Model {
	protected function get_all_image_sizes( $post_id ) {
	    $sizes = get_intermediate_image_sizes();

	    $attachment_id = get_post_thumbnail_id( $post_id );

	    $images = array();
	    foreach ( $sizes as $size ) {
	        $images[ $size ] = wp_get_attachment_image_src( $attachment_id, $size );
	    }

	    return $images;
	}
}