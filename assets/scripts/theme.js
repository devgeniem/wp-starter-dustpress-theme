/**
 * Class Theme
 *
 * Controls theme's JS class running.
 */
class Theme {

    constructor(controllers) {
        this._controllers = controllers;

        // Bind run controllers on document ready.
        document.addEventListener( "DOMContentLoaded", e => this.runDocReady( e ) );
    };

    /**
     * Run theme scripts for the html elements class list.
     */
    runDocReady() {
        for ( let className in this._controllers ) {
            // Run with body class.
            if ( Theme.documentHasClass( className ) ) {
                this._controllers[className].docReady();
            }
        }
    }

    get controllers() {
        return this._controllers;
    }

    getController( name ) {
        if ( typeof this._controllers[name] !== "undefined" ) {
            return this._controllers[name]
        } else {
            return false;
        }
    }

    /**
     * Check wheather the body has the given class.
     *
     * @param {string} docClass The body class string.
     */
    static documentHasClass( docClass ) {
        return document.documentElement.classList.contains( docClass );
    }

}

module.exports = Theme;