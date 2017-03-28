/**
 * An example of a template script file.
 *
 * @param  object window   The window object.
 * @param  object document The document object.
 * @param  object $        jQuery library.
 * @return object app      The Frontpage object.
 */
window.Frontpage = ( function(window, document, $ ) {

    var app = {
        // Fetch a global variable into the local class scope.
        fromGlobalToLocal: window.Main.myGlobalVariable,
        // Add a local variable for only this class.
        frontpageVariable: "This is the frontpage."
    };

    app.cache = function() {
        // Store frontpage DOM nodes here!
    };

    app.init = function() {
        // Run init if the current page has the correct body class.
        if ( window.runWithClass("frontpage") ) {
            // Get the needed DOM nodes.
            app.cache();
            // Do other magic..
        }
    };

    // Run the frontpage script on document ready.
    $(document).ready(app.init);

    return app;

})( window, document, jQuery );
