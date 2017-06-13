const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const junk = require('junk');
const {each, filter} = require('lodash');
const {help, helpAgs} = require('./help');
const {recipe} = require('./recipe');


//eslint-disable-next-line no-sync
const recipes = filter(fs.readdirSync(path.join(__dirname, '..', '/recipes')), f => junk.not(f));
each(recipes, r => gulp.task(r, recipe(r)));

//or fallback to help
each(helpAgs, a => gulp.task(a, help));
