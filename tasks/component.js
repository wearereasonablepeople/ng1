const gulp = require('gulp');
const _ = require('lodash');
const path = require('path');
const change =require('gulp-change');
const paths = require('../config/paths');
const yargs = require('yargs');

const root = 'client';
const cap = val => val.charAt(0).toUpperCase() + val.slice(1);

// Auto-create imports for generated modules
const modulize = (content, module) => {
  const s = content.indexOf('//IMPORTS') + '//IMPORTS'.length;
  const e = content.indexOf(']);');
  const start = content.substr(0, s);
  const end = content.substring(e);
  const previous = content.substring(s, e);

  const imports = `\nimport './${yargs.argv.name}/${module}';`;
  const moduleDef = `  'app.${module}',`;

  return start + imports + previous + moduleDef +  '\n' + end;
};

const component = gulp.task('component', () => {
  const proto = yargs.argv.name.split('/');
  const name = _.last(proto);
  const destPath = path.join(paths.resolveToComponents(), yargs.argv.name);
  const template = {
    name: name,
    APP: 'app',
    upCaseName: cap(name)
  };

  gulp.src(path.join(paths.resolveToComponents(), 'index.js'), {base: './'})
    .pipe(change(content => modulize(content, name)))
    .pipe(gulp.dest('./'));

  return gulp.src(paths.blankComponent)
    .pipe(template(template))
    .pipe(rename(path => path.basename = path.basename.replace('temp', name)))
    .pipe(gulp.dest(destPath));
});

module.exports = component;


//TODO check if exists