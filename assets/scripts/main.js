/**
* Theme JS building
*/

// Require 3rd party libraries
require( "babel-polyfill" );
require( "foundation-sites" );

// Add all theme scripts.
let scripts = {
    "PageFrontpage": require( __dirname + "/page-frontpage.js" )
};

// Run the theme scripts.
let Theme = require( __dirname + "/theme.js" );
Theme = new Theme( scripts );

// Export for global usage.
window.Theme = Theme;

/**
* require main style file here for concatenation
*/

require( __dirname + "/../styles/main.scss" );