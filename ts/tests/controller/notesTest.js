(function() {
    'use strict';
    describe('controller.note', function () {
        beforeEach(module('controller'));

        var controller,
            Note,
            notes = 'fooo';

        beforeEach(inject(function ($injector) {

            var controllerInject = {};
            Note = {
                getList: jasmine.createSpy().and.returnValue(
                    resolvedPromise(notes)
                )
            };
            controllerInject.Note = Note;

            controller = $injector.get('$controller')('NotesController', controllerInject);
        }));

        describe('initialize', function () {

            it('should load list', function () {
                expect(Note.getList).toHaveBeenCalled();
            });

            it('should pass notes to own scope', function () {
                expect(controller.notes).toBe(notes);
            });
        });
    });
})();
