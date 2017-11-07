// Require global controllers.
const globalControllers = {
    'Common': require( __dirname + '/common.js' )
};

// Require theme controllers.
const templateControllers = {
    'Page': require( __dirname + '/page.js' )
};

/**
 * Class Theme
 *
 * This singleton controls theme's JS class running.
 */
class Theme {

    /**
     * The constructor creates the singleton and binds the docready event.
     *
     * @return {object / void} Either the instance of the class or nothing.
     */
    constructor() {
        if ( instance ) {
            return instance;
        }

        // Initialize the controller maps.
        this._templateControllers = {};
        this._globalControllers = {};

        // Load controllers.
        this.setGlobalControllers();
        this.setTemplateControllers();

        this.init();

        // Bind run controllers on document ready.
        document.addEventListener( 'DOMContentLoaded', e => this.runDocReady( e ) );

        const instance = this;
    };

    /**
     * Runs the 'init' function for all included scripts.
     */
    init() {

        // Run all global scripts.
        for ( let className in this._globalControllers ) {
            if ( typeof this._globalControllers[ className ].init === 'function' ) {
                this._globalControllers[ className ].init();
            }
        }

        // Run template-specific scripts
        for ( let className in this._templateControllers ) {
            if ( Theme.documentHasClass( className ) &&
                typeof this._templateControllers[ className ].init === 'function'
            ) {
                this._templateControllers[ className ].init();
            }
        }
    }

    /**
     * A getter for all controllers.
     *
     * @return {object} A hash map of all controllers.
     */
    get controllers() {
        return this._templateControllers.concat( this._globalControllers ) ;
    }

    /**
     * This method returns a controller by its class name if it is found.
     *
     * @param  {string} name The class name of a controller.
     * @return {object|boolean} The controller instance or false if not found.
     */
    getController( name ) {
        if ( typeof this._globalControllers[ name ] !== 'undefined' ) {
            return this._globalControllers[ name ];
        } else if ( typeof this._templateControllers[ name ] !== 'undefined' ) {
            return this._templateControllers[ name ];
        } else {
            return false;
        }
    }

    /**
     * Set the globally run scripts.
     */
    setGlobalControllers() {
        if ( globalControllers ) {
            for ( let className in globalControllers ) {

                // Skip non-function iterations.
                if ( typeof globalControllers[className] !== 'function' ) {
                    continue;
                }

                // Set the class reference as a property under the Theme instance.
                this[className] = globalControllers[ className ];

                // Construct the class and set it under the class property.
                this._globalControllers[className] = new globalControllers[ className ]();
            }
        }
    }

    /**
     * Set the template specific scripts.
     */
    setTemplateControllers() {
        if ( templateControllers ) {
            for ( let className in templateControllers ) {

                // Run the template controller only if the class is defined properly
                // and the css class of the document element contains the controller class name.
                if ( typeof templateControllers[className] === 'function' && Theme.documentHasClass( className ) ) {

                    // Set the (static) class reference as a property under the Theme instance.
                    this[className] = templateControllers[ className ];

                    // Construct the class instance and set it under the class property.
                    this._templateControllers[className] = new templateControllers[ className ]();
                }
            }
        }
    }

    /**
     * Run theme scripts for the html elements class list.
     */
    runDocReady() {

        // Run all global scripts
        for ( let className in this._globalControllers ) {
            if ( typeof this._globalControllers[ className ].docReady === 'function' ) {
                this._globalControllers[ className ].docReady();
            }
        }

        // Run template-specific scripts
        for ( let className in this._templateControllers ) {
            if ( Theme.documentHasClass( className ) &&
                typeof this._templateControllers[ className ].docReady === 'function'
            ) {
                this._templateControllers[ className ].docReady();
            }
        }

        this.addDataCmdListener();
    }

    /**
     * Check wheather the body has the given class.
     *
     * @param {string} docClass The body class string.
     */
    static documentHasClass( docClass ) {
        return document.documentElement.classList.contains( docClass );
    }

    /**
     * Finds parent element with data-cmd attribute.
     *
     * @param {object} Target element.
     */
    findCmdAttribute( element ) {

        let cmdAttr, cmdCtrl, hrefAttr;
        let foundAttr = false;
        let foundLink = false;

        while ( element && element.nodeName && element.getAttribute ) {

            // Find data-cmds
            if ( ! foundAttr ) {
                cmdAttr = element.getAttribute( 'data-cmd' );
                cmdCtrl = element.getAttribute( 'data-ctrl' );

                if ( cmdAttr && cmdCtrl ) {
                    foundAttr = { cid: cmdAttr, el: element, ctrl: cmdCtrl };
                }
            }

            // Find links
            if ( ! foundLink ) {
                hrefAttr  = element.getAttribute( 'href' );

                if ( hrefAttr ) {
                    foundLink = { href: hrefAttr, el: element };
                }
            }
            element = element.parentNode;
        }

        if ( foundAttr ) {
            return {
                cmd: foundAttr,
                link: foundLink
            };
        } else {
            return false;
        }
    }

    /**
     * Add global listener to listen click events. If clicked dom element or parent node
     * has data-cmd and data-ctrl attributes, call the corresponding method
     * in defined controller, if exists.
     */
    addDataCmdListener() {
        jQuery( document ).on( 'click', e => {
            const captured = this.findCmdAttribute( e.target );

            if ( captured ) {
                let command = captured.cmd.cid;
                let controllerName = captured.cmd.ctrl;
                let controllerInstance = this.getController( controllerName );

                if ( controllerInstance && typeof controllerInstance[command] === 'function' ) {
                    this.Common.stop( e );
                    controllerInstance[command].call( controllerInstance, e );
                }
            }
        });
    }

}

module.exports = new Theme();
