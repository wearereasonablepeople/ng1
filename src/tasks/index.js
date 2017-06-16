const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const junk = require('junk');
const {each, filter} = require('lodash');
const {help, helpAgs} = require('./help');
const {seed, fillSeed} = require('./seed');
const {recipe} = require('./recipe');
const {plugin} = require('./plugin');


//eslint-disable-next-line no-sync
const recipes = filter(fs.readdirSync(path.join(__dirname, '../..', 'assets/recipes')), f => junk.not(f));
each(recipes, r => gulp.task(r, recipe(r)));
each(recipes, r => gulp.task(`plugin-${r}`, plugin(r)));
gulp.task('plugin-core', plugin('core'));

//or fallback to help
each(helpAgs, a => gulp.task(a, help));

gulp.task('seed', seed);
gulp.task('fillSeed', ['seed'], fillSeed);
gulp.task('new', ['fillSeed']);
