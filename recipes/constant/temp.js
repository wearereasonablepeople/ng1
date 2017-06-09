import angular from 'angular';

const <%= nameCamelCase %> = 'constant';

angular.module('<%= APP %>.<%= nameCamelCase %>', []).constant('<%= nameCamelCase %>', <%= nameCamelCase %>);
export default <%= nameCamelCase %>;
