const path = require('path');
const {times} = require('lodash');

//source code folder
const root = `${process.cwd()}/client`;

// helper methods for resolving paths
const pathTypes = {
  app: 'app',
  components: 'app/components',
  constants: 'app/constants',
  factories: 'app/factories',
  routes: 'app/routes',
  services: 'app/services'
};
const resolvePath = (type, glob = '') => path.join(root, pathTypes[type], glob);

// map of all paths
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
  blank: type => path.join(__dirname, 'recipes', `${type}/**/*.**`)
};

//Generate path for scss files
const getRootLevel = string => times(string.split('/').length - 1, '').join('../');

module.exports = {
  paths,
  resolvePath,
  getRootLevel,
};
