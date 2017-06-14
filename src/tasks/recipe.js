const gulp = require('gulp');
const yargs = require('yargs');
const path = require('path');
const rename = require('gulp-rename');
const template = require('gulp-template');
const change = require('gulp-change');
const chalk = require('chalk');
const {last, kebabCase, camelCase, capitalize} = require('lodash');
const {paths, resolvePath, getRootLevel} = require('../config/paths');

//Create imports for generated modules
const modulize = (content, moduleGroup, module, argvName) => {

  const s = content.indexOf('//IMPORTS') + '//IMPORTS'.length;
  const e = content.indexOf(']);');
  const start = content.substr(0, s);
  const end = content.substring(e);
  const previous = content.substring(s, e);

  const imports = `\nimport './${argvName}${module ? `/${module}` : ''}';`;
  const moduleDef = `  'app.${moduleGroup}.${camelCase(module) || camelCase(argvName)}',`;

  return `${start + imports + previous + moduleDef}\n${end}`;
};


//if we allow names starting with capital letter (Service) we cannot truly use camelCase
const resolveCamelCase = string => {
  const camelC = camelCase(string);
  return string[0] !== camelC[0]
    ? `${string[0]}${camelC.substr(1)}`
    : camelC;
}

const recipe = type => () => {
  if(!yargs.argv.name && !yargs.argv.n) {
    return console.log(chalk.red.bold('Argument \'--name\' or \'-n\' must be provided!'));
  }
  const argvName = yargs.argv.name || yargs.argv.n;
  const proto = argvName.split('/');
  const name = last(proto);
  const typed = type !== 'factory' ? `${type}s` : 'factories';
  const noFolder = ['service', 'factory', 'constant'];
  const destPath = path.join(resolvePath(typed), (!noFolder.includes(type) ? proto : proto.slice(0, proto.length - 1)).join('/'));
  const scssPath = getRootLevel(`${resolvePath(typed)}/${proto.join('/')}`);

  gulp.src(path.join(resolvePath(typed), 'index.js'), {base: './'})
    .pipe(change(content => modulize(content, typed, (!noFolder.includes(type) ? name : null), argvName)))
    .pipe(gulp.dest('./'));

  return gulp.src(paths.blank(type))
    .pipe(template({
      name: name,
      nameKebabCase: kebabCase(name),
      nameCamelCase: resolveCamelCase(name),
      scssPath: scssPath,
      APP: `app.${typed}`,
      upCaseName: capitalize(name)
    }))
    .pipe(rename(path => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath, {cwd: yargs.argv.gulpEnv}));
};

module.exports = {
  recipe
};
