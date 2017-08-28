<?php
/**
 * Define the generic Page class.
 */

/**
 * The Page class.
 */
class Page extends MiddleModel {

    /**
     * Return the content of the page.
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
