/**
 * Class Theme
 *
 * This singleton controls theme's JS class running.
 */
class Theme {

    /**
     * This holds the singleton.
     */
    static instance;

    /**
     * The constructor creates the singelton and binds the doc ready event.
     *
     * @return {object}                     [description]
     */
    constructor() {
        if (this.instance) {
           return this.instance;
        }

        // Initialize the controller maps.
        this._templateControllers = {};
        this._globalControllers = {};

        // Bind run controllers on document ready.
        document.addEventListener('DOMContentLoaded', e => this.runDocReady(e));

        this.instance = this;
    };

    /**
     * Runs the 'init' function for all included scripts.
     */
    init() {
        // Run all global scripts
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
    getController(name) {
        if ( typeof this._globalControllers[ name ] !== 'undefined' ) {
            return this._globalControllers[ name ]
        }
        else if ( typeof this._templateControllers[ name ] !== 'undefined' ) {
            return this._templateControllers[ name ]
        }
        else {
            return false;
        }
    }

    /**
     * Set the globally run scripts.
     *
     * @param {object} globalControllers The list of global controllers.
     */
    setGlobalControllers(globalControllers) {
        if (Array.isArray(globalControllers)) {
            for (let i = 0; i < globalControllers.length; i++) {
                let className = globalControllers[i].name;
                this[className] = globalControllers[i];
                this._globalControllers[className] = new globalControllers[i](); 
            }
        }
    }

    /**
     * Set the template specific scripts.
     *
     * @param {object} templateControllers The list of template controllers.
     */
    setTemplateControllers(templateControllers) {
        if (Array.isArray(templateControllers)) {
            for (let i = 0; i < templateControllers.length; i++) {
                let className = templateControllers[i].name;
                this[className] = templateControllers[i];
                if ( Theme.documentHasClass( className ) ) {                    
                    this._templateControllers[ className ] = new templateControllers[i]();
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
    }

    /**
     * Check wheather the body has the given class.
     *
     * @param {string} docClass The body class string.
     */
    static documentHasClass(docClass) {
        return document.documentElement.classList.contains(docClass);
    }

}

module.exports = new Theme();
