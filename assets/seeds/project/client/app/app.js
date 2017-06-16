import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import './app.scss';

//require modules
import './services';
import './routes';
import './components';
import './constants';
import './factories';

import config from './config';
import run from './run';

const dependencies = [
  uiRouter,
  ngAnimate,
  'app.constants',
  'app.factories',
  'app.services',
  'app.routes',
  'app.components',
];

angular.module('app', dependencies)
  .config(config)
  .run(run);
