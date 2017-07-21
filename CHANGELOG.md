# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2017-07-21
### Added
- All script classes can be accessed statically via the `Theme` instance.
 - For example the global `Common` class is accessible by calling `Theme.Common`.
 - This enables running static functions within script classes!
- A global and static event stopping function under the `Common` class.
 - To stop the default event on event listener callbacks run `Theme.Common.stop(e);`.
- The `Theme` class now runs a function called `init` for all the global scripts and the currently defined template scripts after all scripts are instantiated.
- This awesome CHANGELOD.md file!

### Changed
- The `Theme` class is now required first in the `main.js` file.
 - `Theme` is globally accessible in any scipt file and in inline scipts.
 - For example you can use the `documentHasClass` function globally by calling `Theme.documentHasClass('class-name')`.
- Script files no longer need to be required with the class name in `main.js`.
- Updated documentation for JavaScript development.