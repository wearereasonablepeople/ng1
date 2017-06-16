/* global environment */
import angular from 'angular';

angular.module('app.constants.endpoint', []).constant('endpoint', environment.api);
export default 'app.constants.endpoint';
