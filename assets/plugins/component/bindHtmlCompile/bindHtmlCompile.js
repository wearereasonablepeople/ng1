import angular from 'angular';
import {each} from 'lodash-es';

const bindHtmlCompile = ($compile, $parse) => {
  'ngInject';

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(() => scope.$eval(attrs.bindHtmlCompile), value => {
        element.html(value && value.toString());
        const propsToBind = $parse(attrs.propsToBind)(scope);
        const data = $parse(attrs.data)(scope);
        each(propsToBind, prop => element.children(0).attr(prop, data[prop]));
        element.children(0).attr('data', attrs.data);
        element.children(0).attr('action', attrs.action);
        $compile(element.contents())(scope);
      });
    }
  };
};

angular.module('app.components.bindHtmlCompile', []).directive('bindHtmlCompile', bindHtmlCompile);
export default bindHtmlCompile;
