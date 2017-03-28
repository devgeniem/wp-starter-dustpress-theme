// Set class name and pass common parameters to it.
window.Main = ( function( window, document, $ ) {

    // Init the app object which refers to the class
    // after the script is fully executed.
    var app = {
        // Use class variables for persistent data within your class scope.
        // The "Main" class can store values used in other script files (see frontpage.js).
        "myGlobalVariable": "My value."
    };

    /**
     * Store dom nodes in cache
     */
    app.cache = function(){
        // Use the dollar sign to identify your jQuery DOM nodes.
        app.$elementName = $("#element");
        // This modifies the initial value of "myGlobalVariable.".
        app.myGlobalVariable = "I changed my value.";
    };

    /**
     * Init the class
     */
    app.init = function(){
        // Run the DOM caching.
        app.cache();
        // Bind an event listener to a cached object if it exists.
        if ( app.$elementName.length ) {
            app.$elementName.on("click", app.elementClick);
        }
    };

    /**
     * An example of an event listener.
     *
     * @param object event
     */
    app.elementClick = function(event) {
        console.log("Ah, you clicked my elemenet!");
    };

    /**
     * Init app object which refers to the class,
     * use this in all other js file to call their
     * init only if a certain body class is present.
     */
    app.runWithClass = function(bodyClass) {
        if ( ! app.$bodyNode || app.$bodyNode.length < 1 ) {
            app.$bodyNode = $("body");
        }
        return app.$bodyNode.hasClass(bodyClass);
    };

    // Run init on document ready for instance.
    $(document).ready(app.init);

    // Return the class to add it under the window object.
    return app;

    // Close the scope.
})( window, document, jQuery );
