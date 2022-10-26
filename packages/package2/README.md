# Package 2
This packages enables fasts tests with html, css, scss and js files from the src folder.
It uses NPM and Gulp.
Currently 6 errors are shown by node, but they are not relevant.
The src provided is just an example of the structure used. You can delete it.

### Install the package with
- npm i

### Start using with the command
- gulp

Note : Use "gulp something" to use the below commands

## HTML
HTML files from the source root folder are watched to reload the page on change.

## Sass & Css
Merge all CSS and Sass files from the source root, then compress it to make a .min. css file
### Related functions
- copy

## JavaScript
JavaScript files from the source root folder are watched to reload the page on change.

## Other functions
### del
Delete the minified css file. It's mostly usefull when you change the gulpfile but creates undesired folders or files

## Related questions
https://stackoverflow.com/questions/74066882/async-completion-error-when-function-called-or-callback-not-a-function-when-cal