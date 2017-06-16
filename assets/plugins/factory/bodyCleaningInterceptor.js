import angular from 'angular';
import {omit} from 'lodash-es';

//This injector removes the _id from the request body, to prevent MongoDB errors when updating
const bodyCleaningInterceptor = () => ({
  request: config => omit(config, 'data._id'),
  response: config => config.data,
});

angular.module('app.factories.bodyCleaningInterceptor', [])
  .factory('bodyCleaningInterceptor', bodyCleaningInterceptor)
  .config($httpProvider => {
    'ngInject';

    $httpProvider.interceptors.push('bodyCleaningInterceptor');
  });
export default bodyCleaningInterceptor;
