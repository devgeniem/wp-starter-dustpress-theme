<?php
/**
 * Define the single post class.
 */

/**
 * The Single class.
 */
class Single extends MiddleModel {

    /**
     * Return the content of the single post.
     */
    public function Content() {
        /**
         * No ACF by default. Uncomment this and delete the regular get post line.
         * $data = \DustPress\Query::get_acf_post( get_the_ID() );
         */
        $data = \DustPress\Query::get_post( get_the_ID() );

        return $data;
    }

    /**
     * Return the post's featured image.
     *
     * @return array the image object array.
     */
    public function featured_img() {

        $featured_img = wp_get_attachment_image_src(
            get_post_thumbnail_id( get_the_ID() ), 'large'
        );

        return $featured_img[0];
    }

}
