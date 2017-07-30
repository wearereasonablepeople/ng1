const {modulize} = require('./recipe');
const gulp = require('gulp');
const path = require('path');
const streamqueue = require('stream-series');
const change = require('gulp-change');
const yargs = require('yargs');
const {resolvePath, paths, getSourcePaths} = require('../config/paths');

const plugin = type => defName => {
  const {name, destPath, typed, noFolder, argvName} = getSourcePaths(type, defName);

  const index = gulp.src(path.join(resolvePath(typed), 'index.js'), {base: './'})
    .pipe(change(content => modulize(content, typed, (!noFolder.includes(type) ? name : null), argvName)))
    .pipe(gulp.dest('./'));

  const files = gulp.src(path.join(paths.plugin(type), argvName) + (noFolder.includes(type) ? '.**' : '/**/*.**'))
    .pipe(gulp.dest(destPath, {cwd: yargs.argv.gulpEnv}));

  return ['app', 'core'].includes(typed) ? files : streamqueue([index, files]);
};

module.exports = {
  plugin,
};
