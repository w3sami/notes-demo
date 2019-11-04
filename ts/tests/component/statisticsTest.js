(function() {
    'use strict';
    describe('component.statistics', function () {
        beforeEach(module('component'));

        var controller;

        beforeEach(inject(function($injector, $componentController) {
            controller = $componentController(
                'statistics'
            );
        }));

        it('should calculate statistics', function () {
            var notes = [{}, {status: 'Completed'}, {status: 'Completed'}, {status: 'Not completed'}];
            controller.$onChanges({notes: {currentValue: notes}});
            expect(controller.total).toBe(4);
            expect(controller.completed).toBe(2);
            expect(controller.notCompleted).toBe(1);
        });
    });
})();
