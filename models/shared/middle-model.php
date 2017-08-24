<?php
/**
 * MiddleModel file
 */

/**
 * MiddleModel class
 */
class MiddleModel extends \DustPress\Model {

    /**
     * Constructor function
     *
     * @param array  $args Arguments.
     * @param object $parent Parent.
     */
    public function __construct( $args = [], $parent = null ) {
        $document_class = get_class( $this );

        add_filter( 'dustpress/data/wp', function( $data ) use ( $document_class ) {
            $data['document_class'] = apply_filters( 'dustpress/document_class', [ $document_class ] );

            return $data;
        });

        parent::__construct( $args, $parent );
    }

    /**
     * Get image sizes
     *
     * @param int $post_id Post ID.
     * @return array
     */
    protected function get_all_image_sizes( $post_id ) {
        $sizes = get_intermediate_image_sizes();
        $attachment_id = get_post_thumbnail_id( $post_id );
        $images = [];
        foreach ( $sizes as $size ) {
            $images[ $size ] = wp_get_attachment_image_src( $attachment_id, $size );
        }

        return $images;
    }

    /**
     * Bind submodels, if user is logged in, bind also subtopbar
     */
    public function submodels() {
        $this->bind_sub( 'Header' );
        $this->bind_sub( 'Footer' );
    }
}
