import angular from 'angular';

const <%= nameCamelCase %> = function() {
  'ngInject';

};

angular.module('<%= APP %>.<%= nameCamelCase %>', []).factory('<%= nameCamelCase %>', <%= nameCamelCase %>);
export default <%= nameCamelCase %>;
