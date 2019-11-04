namespace Directive {
  import IDirective = angular.IDirective;
  import IAttributes = angular.IAttributes;
  import IScope = angular.IScope;

  interface ISortScope extends IScope {
    vm: { orderBy: string };
    sortImage: string;
  }

  interface ISortAttributes extends IAttributes {
    type: string;
  }

  function sort(): IDirective {
    return {
      restrict: 'E',
      scope: true,
      template: `<img ng-src="{{ sortImage }}" />`,
      link: function(
        scope: ISortScope,
        element: any,
        attributes: ISortAttributes
      ) {
        scope.$watch('vm.orderBy', newVal => {
          let sort = 'img/sort';
          if (newVal === attributes.type) {
            sort += 'ActiveAsc';
          } else if (newVal === '-' + attributes.type) {
            sort += 'ActiveDesc';
          } else {
            sort += 'Inactive';
          }
          scope.sortImage = sort + '.png';
        });
      },
    };
  }

  angular.module('directive').directive('sort', sort);
}
