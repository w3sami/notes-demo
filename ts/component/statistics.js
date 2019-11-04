var Component;
(function (Component) {
    var StatisticsController = /** @class */ (function () {
        function StatisticsController() {
        }
        StatisticsController.prototype.$onChanges = function (changes) {
            var _this = this;
            this.total = changes.notes.currentValue.length;
            this.completed = 0;
            this.notCompleted = 0;
            angular.forEach(changes.notes.currentValue, function (note) {
                _this.completed += note.status === 'Completed' ? 1 : 0;
                _this.notCompleted += note.status === 'Not completed' ? 1 : 0;
            });
        };
        return StatisticsController;
    }());
    var StatisticsControllerConfig = {
        controller: StatisticsController,
        controllerAs: 'vm',
        templateUrl: '/html/statistics.html',
        bindings: {
            notes: '<',
        },
    };
    angular
        .module('component')
        .component('statistics', StatisticsControllerConfig);
})(Component || (Component = {}));
//# sourceMappingURL=statistics.js.map