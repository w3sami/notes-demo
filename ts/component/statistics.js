var Component;
(function (Component) {
    var StatisticsController = /** @class */ (function () {
        function StatisticsController() {
        }
        StatisticsController.prototype.$onInit = function () {
            var _this = this;
            console.log('uzx');
            console.log(this.notes);
            this.total = this.notes.length;
            this.completed = 0;
            this.notCompleted = 0;
            this.notes.map(function (note) {
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
            'notes': '<'
        }
    };
    angular
        .module('component', ['model'])
        .component('statistics', StatisticsControllerConfig);
})(Component || (Component = {}));
//# sourceMappingURL=statistics.js.map