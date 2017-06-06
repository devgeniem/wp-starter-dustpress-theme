/**
 * Class Theme
 *
 * Controls theme's JS class running.
 */
class Theme {

    /**
     * The class constructor.
     *
     * @param  {object} templateControllers The hash map for template-specific controllers.
     * @param  {object} globalControllers   The hash map for global controllers.
     */
    constructor( templateControllers, globalControllers ) {
        this._templateControllers = templateControllers;
        this._globalControllers = globalControllers;

        // Bind run controllers on document ready.
        document.addEventListener( "DOMContentLoaded", e => this.runDocReady( e ) );
    };

    /**
     * Run theme scripts for the html elements class list.
     */
    runDocReady() {
        // Run all global scripts
        for ( let className in this._globalControllers ) {
            // Check for method existence.
            if (typeof this._globalControllers[ className ].docReady === 'function') {
                this._globalControllers[ className ].docReady();
            }
        }

        // Run template-specific scripts.
        for ( let className in this._templateControllers ) {
            // Run the 'docReady' method if the document 
            // has the correct document class and the method exists.
            if (Theme.documentHasClass( className ) &&
                typeof this._templateControllers[ className ].docReady === 'function') {
                this._templateControllers[ className ].docReady();
            }
        }
    }

    /**
     * An ES6 getter for all controllers.
     * All controllers are concatenated into a single hash map.
     *
     * @return {object} The hash map object.
     */
    get controllers() {
        return this._templateControllers.concat( this._globalControllers ) ;
    }

    /**
     * Returns a specific controller by the given class name.
     *
     * @param  {string} name    The controller class name.
     * @return {object|boolean} The controller class object.
     */
    getController( name ) {
        if ( typeof this._templateControllers[ name ] !== "undefined" ) {
            return this._templateControllers[ name ]
        }
        else if ( typeof this._globalControllers[ name ] !== "undefined" ) {
            return this._globalControllers[ name ]
        }
        else {
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