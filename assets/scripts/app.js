// Set class name and pass common parameters to it.
window.Main = ( function( window, document, $ ){

    // Init app object which refers to the class.
    var app = {
        // Add initial settings for the class.
        "cached": false
    };

    /**
     * Store dom nodes in cache
     */
    app.cache = function(){
        // Use the dollar sign to identify your jQuery DOM nodes.
        app.$body = $("body");
        // Use class variables for persistent data within your class scope.
        // This modifies the initial value of "cached".
        app.cached = true;
    };

    /**
     * Init the class
     */
    app.init = function(){
        app.$body("on", "click", app.bodyClick);
    };

    /**
     * An example of an event listener.
     *
     * @param event
     */
    app.bodyClick = function(event) {
        console.log("Ah, you clicked my body!");
    };

    /**
     * Init app object which refers to the class,
     * use this in all other js file to call their
     * init only if a certain body class is present.
     */
    app.runWithClass = function() {

        window.runWithClass = function(bodyClass) {
            if ( ! window.bodyNode || window.bodyNode.length < 1 ) {
                window.bodyNode = $("body");
            }
            return window.bodyNode.hasClass(bodyClass);
        };

    };

    // Run init on document ready for instance.
    $(document).ready(app.init);

    // Return the class to add it under the window object.
    return app;

    // Close the scope.
})( window, document, jQuery );