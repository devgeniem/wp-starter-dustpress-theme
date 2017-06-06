/**
* Theme JS building
*/

// Require 3rd party libraries
require( "babel-polyfill" );
require( "foundation-sites" );

// Add template-specific scripts.
let templateScripts = {
    "PageFrontpage": require( __dirname + "/page-frontpage.js" )
};

// Add global scripts that have their 'docReady' method run on every page load.
let globalScripts = {
    "Common": require( __dirname + "/common.js" )
};

// Run the theme scripts.
let Theme = require( __dirname + "/theme.js" );
Theme = new Theme( templateScripts, globalScripts );

// Export for global usage.
window.Theme = Theme;

/**
* require main style file here for concatenation
*/

require( __dirname + "/../styles/main.scss" );