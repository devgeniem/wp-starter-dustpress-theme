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

Replace the `THEMENAME` string with your theme name within all project files with a case ***sensitive*** search and replace. This is used to build a namespace for your themes function files.

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

## Contributors

- [devgeniem](https://github.com/devgeniem)
- [ironland](https://github.com/ironland)
- [villesiltala](https://github.com/villesiltala)
- [nomafin](https://github.com/Nomafin)