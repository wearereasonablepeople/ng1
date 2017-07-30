const path = require('path');
const chalk = require('chalk');
const yargs = require('yargs');
const log = require('../utils/log');
const {times, isString, last} = require('lodash');

// Source code folder
const root = `${yargs.argv.gulpEnv}/client`;

// Helper methods for resolving paths
const pathTypes = {
  app: 'app',
  components: 'app/components',
  constants: 'app/constants',
  core: 'app/core',
  factories: 'app/factories',
  routes: 'app/routes',
  services: 'app/services'
};
const resolvePath = (type, glob = '') => path.join(root, pathTypes[type], glob);

// Map of all paths
const paths = {
  js: resolvePath('components', '**/*!(.spec.js).js'),
  styl: resolvePath('app', '**/*.scss'),
  html: [
    resolvePath('app', '**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(root, 'app/app.js')
  ],
  output: root,
  blank: type => path.join(__dirname, '../..', 'assets/recipes', `${type}/**/*.**`),
  plugin: type => path.join(__dirname, '../..', 'assets/plugins', type),
  seed: type => path.join(__dirname, '../..', 'assets/seeds', type)
};

// Generate path for scss files
const getAppRoot = string => string.substr(string.indexOf(pathTypes.app));
const getRootLevel = string => times(getAppRoot(string).split('/').length, '').join('../');

const getSourcePaths = (type, defName) => {
  if(!yargs.argv.name && !yargs.argv.n && !isString(defName)) {
    return log.error('Argument \'--name\' or \'-n\' must be provided!');
  }
  const argvName = isString(defName) ? defName : yargs.argv.name || yargs.argv.n;
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
  const scssPath = getRootLevel(`${resolvePath(typed)}/${proto.join('/')}`);

  return {name, destPath, scssPath, typed, noFolder, argvName};
};

module.exports = {
  paths,
  resolvePath,
  getRootLevel,
  getSourcePaths,
};
