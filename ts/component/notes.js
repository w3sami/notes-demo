var Component;
(function (Component) {
    var NotesComponent = /** @class */ (function () {
        function NotesComponent(Note) {
            this.Note = Note;
            this.newNote = null;
            this.orderBy = 'id';
        }
        NotesComponent.prototype.selectRow = function (note) {
            this.selectedRow = note.selected ? null : note;
        };
        NotesComponent.prototype.toggleAll = function () { };
        NotesComponent.prototype.add = function () {
            this.newNote = this.Note.newNote();
        };
        NotesComponent.prototype.save = function (note) {
            var _this = this;
            this.Note.saveNote(note)
                .then(function (note) {
                _this.notes.push(note);
                _this.notes = angular.copy(_this.notes); // trigger $onChanges
                _this.cancelSave();
            })
                .catch(function () { return alert('error saving'); });
        };
        NotesComponent.prototype.canSave = function () {
            return this.newNote.title !== '' || this.newNote.content !== '';
        };
        NotesComponent.prototype.cancelSave = function () {
            this.newNote = null;
        };
        NotesComponent.prototype.remove = function () {
            var _this = this;
            var index, i = 0;
            angular.forEach(this.notes, function (note) {
                if (note.id === _this.selectedRow.id) {
                    index = i;
                }
                i++;
            });
            this.notes.splice(index, 1);
            this.notes = angular.copy(this.notes); // trigger $onChanges
            this.selectedRow = null;
        };
        NotesComponent.prototype.cancelRemove = function () {
            this.selectedRow.selected = false;
            this.selectedRow = null;
        };
        NotesComponent.prototype.sort = function (by) {
            if (this.orderBy === by) {
                this.orderBy = '-' + by;
            }
            else {
                this.orderBy = by;
            }
        };
        return NotesComponent;
    }());
    var NotesComponentConfig = {
        controller: NotesComponent,
        controllerAs: 'vm',
        templateUrl: '/html/notes.html?ddd',
        bindings: {
            notes: '=',
        },
    };
    angular.module('component').component('notes', NotesComponentConfig);
})(Component || (Component = {}));
//# sourceMappingURL=notes.js.map