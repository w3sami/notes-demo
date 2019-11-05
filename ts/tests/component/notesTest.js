(function() {
    'use strict';
    describe('component.notes.controller', function () {
        beforeEach(module('component'));

        var controller,
            NoteMock,
            notes;

        beforeEach(inject(function($injector, $componentController) {
            NoteMock = {
                newNote: jasmine.createSpy('newNote').and.returnValue('newNote'),
                saveNote: jasmine.createSpy('saveNote')
            };
            notes = [];
            controller = $componentController(
                'notes',
                {Note: NoteMock},
                {notes: notes}
            );
        }));

        describe('select note row', function () {
            it('should select unselected row', function () {
                var note = {};
                controller.selectRow(note);
                expect(controller.selectedRow).toBe(note);
            });

            it('should deselect selected row', function () {
                var note = {selected: true};
                controller.selectRow(note);
                expect(controller.selectedRow).toBe(null);
            });
        });

        it('should add a note to controller to begin editing', function () {
            controller.add();
            expect(NoteMock.newNote).toHaveBeenCalled();
            expect(controller.newNote).toBe('newNote');
        });

        describe('save note', function () {
            it('should save a new note succesfully', function () {
                var note = 'a note';
                controller.newNote = 'editing note';
                NoteMock.saveNote.and.returnValue(resolvedPromise(note));
                controller.save(note);
                expect(controller.notes.length).toBe(1);
                expect(controller.notes[0]).toBe(note);
                expect(controller.newNote).toBe(null);

            });

            it('should fail saving note', function () {
                NoteMock.saveNote.and.returnValue(rejectedPromise('error'));
                var alert = window.alert = jasmine.createSpy('alert');
                var note = 'a note', newNote = 'editing note';
                controller.newNote = newNote;
                controller.save(note);
                expect(controller.newNote).toBe(newNote);
                expect(alert).toHaveBeenCalledWith('error saving');
            });
        });

        describe('allow save', function () {
            it('should disallow saving without title or content', function () {
                controller.newNote = {title: '', content: ''};
                expect(controller.canSave()).toBe(false);
            });

            it('should allow saving with title', function () {
                controller.newNote = {title: 'foo', content: ''};
                expect(controller.canSave()).toBe(true);
            });

            it('should allow saving with content', function () {
                controller.newNote = {title: '', content: 'bar'};
                expect(controller.canSave()).toBe(true);
            });
        });

        it('should cancel saving', function () {
            controller.newNote = 'foo';
            controller.cancelSave();
            expect(controller.newNote).toBe(null);
        });

        describe('remove', function () {
            it('should remove a row from the list', function () {
                controller.notes = [{id: 1}, {id: 2}, {id: 3}];
                controller.selectedRow = {id: 2};
                controller.remove();
                expect(controller.notes.length).toBe(2);
                expect(controller.notes[0].id).toBe(1);
                expect(controller.notes[1].id).toBe(3);
                expect(controller.selectedRow).toBe(null);
            });

            it('should skip removing with unknown id', function () {
                controller.notes = [{id: 1}, {id: 2}, {id: 3}];
                controller.selectedRow = {id: 5};
                controller.remove();
                expect(controller.notes.length).toBe(3);
                expect(controller.selectedRow.id).toBe(5);
            });
        });

        it('should cancel removing', function () {
            var row = {id: 5};
            controller.selectedRow = row;;
            controller.cancelRemove();
            expect(controller.selectedRow).toBe(null);
            expect(row.selected).toBe(false);
        });

        describe('sorting', function () {
            it('should set sort on first click', function () {
                controller.orderBy = 'other';
                controller.sort('id');
                expect(controller.orderBy).toBe('id');
            });

            it('should set sort on second click', function () {
                controller.orderBy = 'id';
                controller.sort('id');
                expect(controller.orderBy).toBe('-id');
            });

            it('should set sort on third click', function () {
                controller.orderBy = '-id';
                controller.sort('id');
                expect(controller.orderBy).toBe('id');
            });
        });
    });

    describe('component.notes.view', function () {
        beforeEach(module('component'));
        beforeEach(module('model'));
        beforeEach(module('directive'));
        beforeEach(module('templates'));

        var notesComponent,
            $scope,
            notes,
            $timeout;

        beforeEach(inject(function ($rootScope, $compile, Note, _$timeout_) {
            $timeout = _$timeout_;
            $scope = $rootScope;
            Note.getList().then(list => {
                $scope.notes = notes = list;
                notesComponent = $compile('<notes notes="notes"></notes>')($scope);
            });
            $timeout.flush();
            $scope.$digest();
        }));

        it('should render the notes', function () {
            expect(notesComponent.find('tr').length).toBe(4);
            expect(notesComponent.find('tr').find('td').eq(0).text().trim()).toBe('' + notes[0].id);
            expect(notesComponent.find('tr').find('td').eq(1).text()).toBe(notes[0].title);
            expect(notesComponent.find('tr').find('td').eq(2).text()).toBe(notes[0].content);
            expect(notesComponent.find('tr').find('td').eq(3).text()).toBe(notes[0].status);
        });

        it('should sort', function () {
            // id sorted asc as default
            expect(notesComponent.find('tr').eq(0).find('th').find('img').attr('src')).toBe('img/sortActiveAsc.png');
            expect(notesComponent.find('tr').eq(1).find('td').eq(0).text().trim()).toBe('1');
            expect(notesComponent.find('tr').eq(2).find('td').eq(0).text().trim()).toBe('2');
            expect(notesComponent.find('tr').eq(3).find('td').eq(0).text().trim()).toBe('3');

            // sort desc
            notesComponent.find('tr').find('th').eq(0).triggerHandler('click');
            expect(notesComponent.find('tr').eq(0).find('th').find('img').attr('src')).toBe('img/sortActiveDesc.png');
            expect(notesComponent.find('tr').eq(1).find('td').eq(0).text().trim()).toBe('3');
            expect(notesComponent.find('tr').eq(2).find('td').eq(0).text().trim()).toBe('2');
            expect(notesComponent.find('tr').eq(3).find('td').eq(0).text().trim()).toBe('1');

            // asc again
            notesComponent.find('tr').find('th').eq(0).triggerHandler('click');
            expect(notesComponent.find('tr').eq(1).find('td').eq(0).text().trim()).toBe('1');
            expect(notesComponent.find('tr').eq(2).find('td').eq(0).text().trim()).toBe('2');
            expect(notesComponent.find('tr').eq(3).find('td').eq(0).text().trim()).toBe('3');

            // sort by title
            notesComponent.find('tr').find('th').eq(1).triggerHandler('click');
            expect(notesComponent.find('tr').eq(0).find('th').find('img').attr('src')).toBe('img/sortInactive.png');
        });

        it('should open the new dialog', function () {
            notesComponent.find('button').triggerHandler('click');
            expect(angular.element(notesComponent[0].querySelector('.newNote')).length).toBe(1);
        });

        it('should not save without title or content', function () {
            notesComponent.find('button').triggerHandler('click');
            notesComponent.find('input').eq(4).val('').triggerHandler('change');
            $scope.$digest();
            expect(notesComponent.find('button').eq(1).prop('disabled')).toBe(true);
        });

        it('should save a new note', function () {
            notesComponent.find('button').triggerHandler('click');
            notesComponent.find('input').eq(4).val('title').triggerHandler('change');
            notesComponent.find('textarea').val('content').triggerHandler('change');
            $scope.$digest();
            expect(notesComponent.find('button').eq(1).prop('disabled')).toBe(false);
            notesComponent.find('button').eq(1).triggerHandler('click');
            $timeout.flush();
            expect(notesComponent.find('textarea').length).toBe(0);
            expect(notesComponent.find('tr').length).toBe(5);
            expect(notesComponent.find('tr').eq(4).find('td').eq(0).text().trim()).toBe('4');
            expect(notesComponent.find('tr').eq(4).find('td').eq(1).text().trim()).toBe('title');
            expect(notesComponent.find('tr').eq(4).find('td').eq(2).text().trim()).toBe('content');
        });

        it('should show the remove dialog', function () {
            notesComponent.find('input').eq(1).triggerHandler('click');
            expect(angular.element(notesComponent[0].querySelector('.remove')).length).toBe(1);
        });

        it('should remove a row', function () {
            notesComponent.find('input').eq(1).triggerHandler('click');
            notesComponent.find('button').eq(1).triggerHandler('click');
            $scope.$digest();
            expect(notesComponent.find('tr').length).toBe(3);
        });

    });
})();
