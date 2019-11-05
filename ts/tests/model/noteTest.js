(function() {
    'use strict';
    describe('model.notes', function () {
        beforeEach(module('model'));

        var Note, $timeout;

        beforeEach(inject(function ($injector, _Note_, _$timeout_) {
            Note = _Note_;
            $timeout = _$timeout_;
        }));

        it('should get a new note', function () {
            expect(Note.newNote().title).toBe('');
            expect(Note.newNote().content).toBe('');
            expect(Note.newNote().status).toBeDefined();
        });

        it('should get the list of notes', function () {
            var list;
            Note.getList().then(notes => {
                list = notes;
            });
            $timeout.flush();
            expect(list.length).toBe(3);
        });

        it('should fake save notes', function () {
            var note = {}, returned;
            Note.saveNote(note).then(saved => {
                returned = saved;
            });
            $timeout.flush();
            expect(returned.id).toBe(4);
        });
    });
})();
