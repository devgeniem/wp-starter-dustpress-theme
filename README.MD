![geniem-github-banner](https://cloud.githubusercontent.com/assets/5691777/14319886/9ae46166-fc1b-11e5-9630-d60aa3dc4f9e.png)

# DustPress Starter Theme

This repository contains the starter theme for Geniem WordPress projects using [DustPress](https://github.com/devgeniem/dustpress/).

## Installation

Install the theme manually by cloning the repository under your WordPress themes directory and then removing the git tracking:

```
git clone git@github.com:devgeniem/wp-starter-dustpress-theme.git your-theme-name
rm -rf your-theme-name/.git
```

## Setup

First you need to install required npm packages to start developing. In your theme root run:

```
npm install
```

Replace the `THEMENAME` string with your theme name within all project files with a case ***sensitive*** search and replace. This is used for namespacing the theme function files.

## Translations and textdomain

Translations and the theme textdomain are loaded from under the `/lang` directory. Replace the `themename` string with your theme textdomain within all project files with a case ***sensitive*** search and replace. Then rename the `.pot` file under the `/lang` directory with the new theme textdomain.

## Assets and Webpack

Assets are compiled with [Webpack](https://webpack.github.io/docs/what-is-webpack.html). Use [npm](https://www.npmjs.com/) to install packages and require them in [assets/scripts/main.js](https://github.com/devgeniem/wp-starter-dustpress-theme/blob/master/assets/scripts/main.js) or the themes sass files. The directory under which the assets are build is `/dist`. 

The url to be used with the assets is defined in `/lib/setup.php` with the `ASSET_PATH` constant. It points to `https://sitedomain.test/app/themes/themename/dist` by default. This can be overridden for example in `wp-config.php`  to use an external source for theme assets.

### Development

Run webpack in the theme root in your local environment.

Run with the npm script:

```
npm run dev/watch
```

Run with webpack:

```
webpack (--watch)
```

These commands will compile *unminified* versions of your assets.

### Production

Build _minified_ versions for production with the npm script:

```
npm run build
```

or with webpack

```
webpack -p
```

These commands will compile *minified* versions of your assets.

## JavaScript development guide

The theme's Webpack config uses [Babel](https://babeljs.io/) to compile [ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015) into [ES5](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition). Thus we use [classes](http://es6-features.org/#ClassDefinition) and other cool features introduced in ES6. See the full list of ES6 features [here](http://es6-features.org/).

The theme's main JS file `theme.js` holds the main theme class. The `Theme` class has runs other theme JS classes automatically on document ready event. To enable autoloading on JS side define your template scripts as follow:

1. Create a separate script file for each WordPress template, for example `page-frontpage.js`.

2. Define a JS class mimicking your DustPress model, for example `Class PageFrontpage {}`.

3. The document's html element will automatically get a class from your main model, for example `<html class="PageFrontpage">`. If you add more scripts for a specific template, add the corresponding class names into the `html` element's classlist.

4. Require your template script in `main.js` and add it into the controllers list.

   ```javascript
   // Add all theme controllers.
   let controllers = {
     	// The object name must match the class name.
       "PageFrontpage": require( __dirname + "/page-frontpage.js" )
     	// Add other scripts here..
   };

   // Run theme scripts.
   let Theme = require( __dirname + "/theme.js" );
   Theme = new Theme( controllers );
   ```

5. The `Theme` class will then automatically run a function called `docReady` when the document is ready. *Remember to define it in your template class!*

The `Theme` class is accessible globally under the `window` object. To access a single template script for instance in some inline script, fetch it as follows:

```javascript
var PageFrontpage = window.Theme.getController("PageFrontpage");
```

To run all `docReady` functions manually for the current template *(controlled by the current html element classlist)*, run it with the class function:

```
window.Theme.runDocReady();
```



##  Contributors

- [devgeniem](https://github.com/devgeniem)
- [ironland](https://github.com/ironland)
- [villesiltala](https://github.com/villesiltala)
- [nomafin](https://github.com/Nomafin)