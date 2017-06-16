const {modulize} = require('./recipe');
const gulp = require('gulp');
const path = require('path');
const streamqueue = require('stream-series');
const change = require('gulp-change');
const yargs = require('yargs');
const chalk = require('chalk');
const log = require('../utils/log');
const {last, isString} = require('lodash');
const {resolvePath, paths} = require('../config/paths');

const plugin = type => defName => {
  if(!yargs.argv.name && !yargs.argv.n && !isString(defName)) {
    return log.error('Argument \'--name\' or \'-n\' must be provided!');
  }
  const argvName = isString(defName)
    ? defName
    : yargs.argv.name || yargs.argv.n;
  log.info(`Adding ${chalk.cyan(type)} with name ${chalk.cyan(argvName)}`);
  const proto = argvName.split('/');
  const name = last(proto);
  const typed = type === 'factory'
    ? 'factories'
    : ['app', 'core'].includes(type)
      ? type
      : `${type}s`;
  const noFolder = ['service', 'factory', 'constant', 'core', 'app'];
  const destPath = path.join(resolvePath(typed), (!noFolder.includes(type) ? proto : proto.slice(0, proto.length - 1)).join('/'));

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
