/**
 * Common JS controller.
 *
 * Use this class to run scripts globally and to provide
 * modular helper functions for other scripts classes.
 */

// Use jQuery as $ within this file scope.
const $ = jQuery;

// Require fastclick for a faster mobile UX.
const FastClick = require( 'fastclick' );

/**
 * Class Common
 */
class Common {

    /**
     * Class constructor is for binding class properties.
     */
    constructor() {
    }

    /**
     * Cache dom elements for use in the class's methods
     */
    cache() {

        // The accessible outline style container.
        this.focusStyleContainer = document.getElementById( 'accessible-outline' );
    }


    /**
     * All common events
     */
    events() {

        // Add the outline nullifying style to the
        // container in the document head when using the mouse.
        document.body.addEventListener( 'mousedown', e => {
            this.focusStyleContainer.innerHTML = '*:focus{outline:none}';
        });

        // Remove the outline nullifying style from the
        // container in the document head when using the keyboard.
        document.body.addEventListener( 'keydown', e => {
            this.focusStyleContainer.innerHTML = '';
        });
    }

    /**
     * Run when the document is ready.
     */
    docReady() {

        this.cache();
        this.events();
        FastClick.attach( document.body );

    }

    /**
     * Offers safe way to stop a JS event.
     *
     * Example usage:
     * Theme.Common.stop(e);
     *
     * @param e Event object.
     */
    static stop( e ) {
        e.preventDefault ? e.preventDefault() : ( e.returnValue = false );
    }

    /**
     * Select a list of matching elements, context is optional.
     *
     * @param  {string} selector A query selector string.
     * @param  {object} context  A query context object.
     * @return {object|null}     Returns null if no matches are found; otherwise, it returns the first matching element.
     */
    static $( selector, context ) {
        return ( context || document ).querySelectorAll( selector );
    }

    /**
     * Select the first match only, context is optional.
     *
     * @param  {string} selector The qyery selector string.
     * @param  {object} context  A query context object.
     * @return {object|null}     Returns null if no matches are found; otherwise, it returns the first matching element.
     */
    static $1( selector, context ) {
        return ( context || document ).querySelector( selector );
    }

}

// Export the class reference.
module.exports = Common;
