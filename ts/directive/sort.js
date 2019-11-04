var Directive;
(function (Directive) {
    function sort() {
        return {
            restrict: 'E',
            scope: true,
            template: "<img ng-src=\"{{ sortImage }}\" />",
            link: function (scope, element, attributes) {
                scope.$watch('vm.orderBy', function (newVal) {
                    var sort = 'img/sort';
                    if (newVal === attributes.type) {
                        sort += 'ActiveAsc';
                    }
                    else if (newVal === '-' + attributes.type) {
                        sort += 'ActiveDesc';
                    }
                    else {
                        sort += 'Inactive';
                    }
                    scope.sortImage = sort + '.png';
                });
            },
        };
    }
    angular.module('directive').directive('sort', sort);
})(Directive || (Directive = {}));
//# sourceMappingURL=sort.js.map