<?php
/**
 * Define the index page class.
 */

/**
 * The Index class.
 */
class Index extends MiddleModel {

    /**
     * Return the content of the index page.
     */
    public function Content() {
        /**
         * No ACF by default. Uncomment this and delete the regular get post line.
         * $data = \DustPress\Query::get_acf_post( get_the_ID() );
         */
        $data = \DustPress\Query::get_post( get_the_ID() );

        return $data;
    }

}
