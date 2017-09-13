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

Assets are compiled with [Webpack](https://webpack.github.io/docs/what-is-webpack.html). Use [npm](https://www.npmjs.com/) to install packages and require JavaScript files in [assets/scripts/main.js](https://github.com/devgeniem/wp-starter-dustpress-theme/blob/master/assets/scripts/main.js) and import Sass files in [assets/styles/main.scss](https://github.com/devgeniem/wp-starter-dustpress-theme/blob/master/assets/styles/main.scss). The directory under which the assets are build is `assets/dist`. 

***You should only enqueue files that are under `assets/dist`!***

The URL to be used with the assets is defined in `/lib/setup.php` with the `ASSET_URI` constant. It points to `https://{site_domain}/{path_to_themes_folder}/themename/dist` by default. To use another source for assets this value can be changed by defining the constant for example in the `wp-config.php` file with a custom URI.

## Asset versioning

The style and script files are automatically enqueued with the current theme version. To bust browser cache on asset updates change the theme version in the `style.css` file comments.

### Development

Run webpack in the theme root in your local environment.

Run with the npm script:

```
npm run dev/watch
```

or run with Webpack:

```
webpack (--watch)
```

These commands will compile *unminified* versions of your assets.

### Production

Build _minified_ versions for production with the npm script:

```
npm run build
```

or with Webpack:

```
webpack -p
```

These commands will compile *minified* versions of your assets.

## JavaScript development guide

The theme's Webpack config uses [Babel](https://babeljs.io/) to compile [ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015) into [ES5](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition). Thus we use [classes](http://es6-features.org/#ClassDefinition) and other cool features introduced in ES6. See the full list of ES6 features [here](http://es6-features.org/).

### Enable Babel compiling

If you add *npm packages* using ES6 features, remember to include them for the Babel loader in the `webpack.config.js` file!

```
// List paths to packages using ES6 to enable Babel compiling.
include: [
    path.resolve(__dirname, 'assets/scripts'),
    path.resolve(__dirname, 'node_modules/foundation-sites')
],
```

*UglifyJS will most likely produce an error when trying to minify an ES6 script that is not included for the Babel loader while running `webpack -p`!* 

### Theme scripts

The theme's main JS file `theme.js` holds the main theme class. The `Theme` class runs other theme JS classes automatically on document ready event. To enable autoloading on JS side define your template scripts as follow:

1. Create a separate script file for each WordPress template, for example `page-frontpage.js`. You can also create script files that are loaded anyway regardless of the template.

2. Define a JS class mimicking your DustPress model, for example `class PageFrontpage {}` and make the Webpack module export the class reference: `module.exports = PageFrontpage;`.

3. The document's html element will automatically get a class from your main model, for example `<html class="PageFrontpage">`. If you add more scripts for a specific template, add the corresponding class names into the `html` element's classlist with `dustpress/document_class` filter.

4. Require your scripts in `main.js` and add then into appropriate the controller lists. The order of the scripts is essential if you need to access functions from other script classes. 

   ```javascript
   // Add your global scripts here.
   let globalControllers = [
       require(__dirname + '/common.js')
   ];

   // Add your template-specific scripts here.
   let templateControllers = [
       require(__dirname + '/page-frontpage.js'),
       require(__dirname + '/category.js')
   ];
   ```

5. The `Theme` class will then automatically run a function called `docReady` when the document is ready. *Remember to define it in your template class!*

### The `Theme` class

The `Theme` class controls the theme script classes. The class instance is accessible globally and thus `Theme` is a reserved JavaScript object name in our themes. `Theme` holds all scripts under corresponding class properties. Global scripts are under `_globalControllers` and template specific scripts are under `_templateControllers`. These properties are hash maps meaning each controller is under a key defined with the class name:

```
this._templateController = {
  {className}: {classInstance}
}
```

The controller classes are instantiated by the set functions (`setGlobalControllers` and `setTemplateControllers`) run by the `main.js`. Thus an instance of a class is created and accessible before the document is ready and loaded. Template controllers are instantiated only if the corresponding style class name is defined for the `html` element in the DOM. If the template controller class is not instantiated, you can still access it statically by calling `Theme.{ClassName}`.

**This class is not to be modified! Use other script files to do the magic in you theme!**

#### Accessing controllers

To access a class instance for example in some inline script, fetch it as follows:

```javascript
var frontpageInstance = Theme.getController("PageFrontpage");
```

To access a class reference, fetch it as follows:

```javascript
var commonClass = Theme.Common;
```

Class references are useful if you need global static functions. For instance you might create a static global Vanilla JS query selector under `common.js`:

```javascript
// Select a list of matching elements, context is optional.
static $(selector, context) {
    return (context || document).querySelectorAll(selector);
}
```

and then use it as follows:

```
let element = Theme.Common.$('.my-element');
```

#### `docReady` functions

If you manipulate the DOM dynamically and need to rerun *all* `docReady` functions for the current template *(controlled by the current html element classlist)*, run it with the class function:

   ```
Theme.runDocReady();
   ```

Alternatively you can run the `docReady` for a single controller instance:

```javascript
Theme.getController('PageFrontpage').docReady();
```

#### `init` functions

The `Theme` class runs a function called `init` for all the global scripts and the currently defined template scripts after all scripts are instantiated. If you want access other script classes on the class constructor, they might not be accessible yet due to the require order. By running your scripts on the `init` function all other script classes are already loaded and instantiated. Here is an example usage:

```javascript
// On the PageFrontpage class
init() {
  // I need to acces the sidebar!
  this.Sidebar = Theme.getController('Sidebar');
  // Now we can run stuff before the docReady..
  this.Sidebar.frontPageMakesMeDoStuff();
}
```

### The `Common` class

The theme assets include a default common script class called `Common`. Use this as the default class for all of your global functions and properties. For instance you might handle the main menu in the `Common` class.

*Do not bloat this class! Do not be afraid to introduce more global controller classes if your script files get too long! What ever you do, [D.R.Y](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)!*

#### Useful functions under `Common`

#### **`stop`**

This **static** function enables you to safely stop the default event on event listener callbacks. Use it as follows:

```
myEventCallback(e) {
	Theme.Common.stop(e);
    // Do some other stuff with the event..
}
```

#### **`#### **

This **static** function wraps the `querySelectorAll` function an lets you select a list of matching elements. To optimize the query add a context element and only query under it.

```
let elements = Theme.Common.$('.my-element', myParentElementObject);
```

#### **`$1`**

This **static** function wraps the `querySelector` functions to select a single element from the `DOM`. To optimize the query add a context element and only query under it.

```
let element = $1('.my-element', myParentElementObject);
```

### Global event listener and data-cmd attributes

Theme class adds global click event listener which you can use by adding data-cmd and data-ctrl attributes
to your html element, where `data-ctrl` defines the JavaScript controller class and `data-cmd` the method to be called.
```
<button data-cmd="doSomething" data-ctrl="MyAwesomeController" />
```

##  Contributors

- [devgeniem](https://github.com/devgeniem)
- [ironland](https://github.com/ironland)
- [villesiltala](https://github.com/villesiltala)
- [nomafin](https://github.com/Nomafin)
- [petrimj](https://github.com/petrimj)
