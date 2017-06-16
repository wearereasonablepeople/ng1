import angular from 'angular';

//This injector enhances the url with the endpoint of the api server
const endpointInterceptor = ($q, endpoint) => {
  'ngInject';

  return {
    request: config => {
      if(!config.url.includes('http://') && !config.url.includes('https://')) {
        config.url = endpoint + config.url;
      }
      return config;
    }
  };
};

angular.module('app.factories.endpointInterceptor', [])
  .factory('endpointInterceptor', endpointInterceptor)
  .config($httpProvider => {
    'ngInject';

    $httpProvider.interceptors.push('endpointInterceptor');
  });
export default endpointInterceptor;
