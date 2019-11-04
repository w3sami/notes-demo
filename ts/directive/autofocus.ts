namespace Directive {
  import IDirective = angular.IDirective;
  import IScope = angular.IScope;
  import ITimeoutService = angular.ITimeoutService;

  function autofocus($timeout: ITimeoutService): IDirective {
    return {
      restrict: 'A',
      link: function(scope: IScope, element: JQLite) {
        $timeout(function() {
          element[0].focus();
        });
      },
    };
  }

  angular.module('directive').directive('autofocus', autofocus);
}
