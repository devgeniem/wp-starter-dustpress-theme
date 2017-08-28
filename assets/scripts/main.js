/**
 * Theme JS building
 */

// Require 3rd party libraries
require( 'babel-polyfill' );
require( __dirname + '/modernizr.js' );
// Uncomment to include Foundation scripts.
// require( 'foundation-sites' );

// Run the theme scripts.
let Theme = require( __dirname + '/theme.js' );

// Export the theme controller for global usage.
window.Theme = Theme;

// Add your global scripts here.
let globalControllers = [
    require(__dirname + '/common.js')
];

// Add your template-specific scripts here.
let templateControllers = [
    require(__dirname + '/page-frontpage.js'),
    require(__dirname + '/page-sidenav.js')
];

// Pass the required scripts and construct the global ones first.
Theme.setGlobalControllers(globalControllers);
Theme.setTemplateControllers(templateControllers);

// Run the init function for all scripts.
Theme.init();

// Require main style file here for concatenation.
require(__dirname + '/../styles/main.scss');
