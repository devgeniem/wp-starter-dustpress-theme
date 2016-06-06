
// set class name and pass common parameters to it
window.Main = ( function( window, document, $ ){

    // init app object which refers to the class
    var app = {};

    // store dom nodes in cache
    app.cache = function(){

    };

    // init the class
    app.init = function(){

    };

    // init app object which refers to the class, use this in all other js file to call their init only if a certain body class is present.
    app.runWithClass = function() {

        window.runWithClass = function(bodyClass) {
            if ( ! window.bodyNode || window.bodyNode.length < 1 ) {
                window.bodyNode = $("body");
            }
            return window.bodyNode.hasClass(bodyClass);
        };

    };

    // run init on document ready
    $(document).ready(function() {
        app.init();
    });

    // return the class
    return app;

// close scope
})( window, document, jQuery );