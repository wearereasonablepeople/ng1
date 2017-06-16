import angular from 'angular';

const <%= nameCamelCase %>Service = function() {
  'ngInject';

};

angular.module('<%= APP %>.<%= nameCamelCase %>', []).service('<%= nameCamelCase %>', <%= nameCamelCase %>Service);
export default <%= nameCamelCase %>Service;
