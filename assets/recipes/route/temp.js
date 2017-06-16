import angular from 'angular';
import routeWrap from 'ng-component-routing';
import template from './<%= name %>.html';
import './<%= name %>.scss';

const controller = function() {
  'ngInject';

  this.name = '<%= nameCamelCase %>';

  this.$onInit = () => {
    //bindings available here
  };
  
};

const <%= nameCamelCase %>Component = {
  bindings: {},
  routeOpts: {
    name: '<%= nameCamelCase %>',
    url: '/<%= nameKebabCase %>',
    //componentBindings: [],
    //resolve: [],
    pageTitle: '<%= nameCamelCase %>',
  },
  template,
  controller,
  controllerAs: 'vm'
};

routeWrap(angular).module('<%= APP %>.<%= nameCamelCase %>', []).route('<%= nameCamelCase %>', <%= nameCamelCase %>Component);
export default <%= nameCamelCase %>Component;
