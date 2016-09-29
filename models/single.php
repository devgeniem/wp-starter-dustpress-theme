<?php

class Single extends MiddleModel {

    public function Content() {
        //$post = \DustPress\Query::get_acf_post(get_the_ID());
        // no acf by default
        $post = \DustPress\Query::get_acf_post(get_the_ID());
        return $post;
    }

    public function featured_img() {
        $featured_img = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), 'large');
        return $featured_img[0];
    }

}