const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const {recipe} = require('./recipe');
const {each, filter} = require('lodash');

//eslint-disable-next-line no-sync
const recipes = filter(fs.readdirSync(path.join(__dirname, '..', '/recipes')), r => r !== '.DS_STORE');
each(recipes, g => gulp.task(g, recipe(g)));
