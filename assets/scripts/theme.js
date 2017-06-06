/**
 * Class Theme
 *
 * Controls theme's JS class running.
 */
class Theme {

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
            this._globalControllers[ className ].docReady();
        }

        // Run template-specific scripts
        for ( let className in this._templateControllers ) {
            if ( Theme.documentHasClass( className ) ) {
                this._templateControllers[ className ].docReady();
            }
        }
    }

    get controllers() {
        return this._templateControllers.concat( this._globalControllers ) ;
    }

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