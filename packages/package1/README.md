# Package 1
This package copies files from an "src" folder into a "public" folder.
It uses NPM and Gulp.
Currently 6 errors are shown by node, but they are not relevant.
The src provided is just an example of the structure used. You can delete it.

### Install the package with
- npm i

### Start using with the command
- gulp

Note : Use "gulp something" to use the below commands

## HTML
All html are copied and pasted in the public folder, keeping the arborescence.
Example :
- src/index.html becomes public/index.html
- src/template-parts/footer.html becomes public/template-parts/footer.html
### Related functions
- copyHtml

## Sass & CSS
Merge all CSS and Sass Files, then compress it to make a .min.css file
### Related functions
- copyCss

## JavaScript
Merge all Javascript files, then compress it to make a .min.js file
### Related functions
- copyJs

## Images
All files from the "img" are copied in the public order
### Related functions
- copyImg

## Other functions
### del
Delete the public folder. It's mostly usefull when you change the gulpfile but creates undesired folders or files