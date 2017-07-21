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
     * Run when the document is ready.
     */
    docReady() {
    }
}

module.exports = new Common();
