var Directive;
(function (Directive) {
    function autofocus($timeout) {
        return {
            restrict: "A",
            link: function (scope, element) {
                $timeout(function () {
                    element.focus();
                });
            }
        };
    }
    angular
        .module('directive')
        .directive('autofocus', autofocus);
})(Directive || (Directive = {}));
//# sourceMappingURL=autofocus.js.map