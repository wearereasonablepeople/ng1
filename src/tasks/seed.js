const gulp = require('gulp');
const yargs = require('yargs');
const chalk = require('chalk');
const log = require('../utils/log');
const {recipe} = require('./recipe');
const {plugin} = require('./plugin');
const {paths} = require('../config/paths');

const taskTypes = {
  recipe,
  plugin,
};

const seed = () => {
  log.info('Generating', chalk.cyan('seed'));
  const seedRoot = paths.seed(yargs.argv.type || 'project');
  return gulp.src([
    `${seedRoot}/**/*`,
    `${seedRoot}/**/.*`,
    `!${seedRoot}/.ng1`,
  ]).pipe(gulp.dest('', {cwd: yargs.argv.gulpEnv}));
};

const awaitStream = stream => new Promise((res, rej) => {
  stream.once('end', res);
  stream.once('error', rej);
});

const fillSeed = cb => {
  const seedRoot = paths.seed(yargs.argv.type || 'project');
  const ng1 = require(`${seedRoot}/.ng1`);
  ng1.reduce((p, {task, type, name}) => p.then(_ => awaitStream(taskTypes[task](type)(name))), Promise.resolve())
    .then(cb)
    .catch(log.error);
};

module.exports = {
  seed,
  fillSeed
};
