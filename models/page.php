<?php
class Page extends MiddleModel {

    public function Content() {
        $data = \DustPress\Query::get_acf_post( get_the_ID() );
        return $data;
    }

}
