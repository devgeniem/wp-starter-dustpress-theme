/**
 * Common JS controller.
 *
 * Use this class to run scripts globally and to provide
 * modular helper functions for other scripts classes.
 */

// Use jQuery as $ within this file scope.
const $ = jQuery;

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
     * Run when the document is ready.
     */
        docReady() {
    }

    /**
     * Offers safe way to stop a JS event.
     *
     * Example usage:
     * Theme.Common.stop(e);
     *
     * @param e Event object.
     */
    static stop(e) {
        e.preventDefault ? e.preventDefault() : ( e.returnValue = false );
    }

    /**
     * Select a list of matching elements, context is optional.
     *
     * @param  {string} selector The qyery selector string.
     * @param  {object} context  A query context object.
     * @return {object|null}     Returns null if no matches are found; otherwise, it returns the first matching element.   
     */
    static $(selector, context) {
        return (context || document).querySelectorAll(selector);
    }

    /**
     * Select the first match only, context is optional.
     *
     * @param  {string} selector The qyery selector string.
     * @param  {object} context  A query context object.
     * @return {object|null}     Returns null if no matches are found; otherwise, it returns the first matching element.   
     */
    function $1(selector, context) {
        return (context || document).querySelector(selector);
    }

}

// Export the class reference.
module.exports = Common;
