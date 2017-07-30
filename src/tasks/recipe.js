const gulp = require('gulp');
const yargs = require('yargs');
const path = require('path');
const rename = require('gulp-rename');
const template = require('gulp-template');
const change = require('gulp-change');
const streamqueue = require('stream-series');
const {kebabCase, camelCase, capitalize} = require('lodash');
const {paths, resolvePath, getSourcePaths} = require('../config/paths');

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
};

const recipe = type => defName => {
  const {name, destPath, scssPath, typed, noFolder, argvName} = getSourcePaths(type, defName);

  const index = gulp.src(path.join(resolvePath(typed), 'index.js'), {base: './'})
    .pipe(change(content => modulize(content, typed, (!noFolder.includes(type) ? name : null), argvName)))
    .pipe(gulp.dest('./'));

  const files = gulp.src(paths.blank(type))
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

  return streamqueue([index, files]);
};

module.exports = {
  recipe,
  modulize,
};
