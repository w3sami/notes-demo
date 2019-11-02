var Component;
(function (Component) {
    var NotesComponent = /** @class */ (function () {
        function NotesComponent(Note) {
            this.Note = Note;
            this.newNote = null;
        }
        NotesComponent.prototype.selectRow = function (note) {
            console.log(note.selected);
        };
        NotesComponent.prototype.toggleAll = function () {
        };
        NotesComponent.prototype.add = function () {
            this.newNote = this.Note.newNote();
        };
        NotesComponent.prototype.save = function (note) {
            var _this = this;
            this.Note.saveNote(note).then(function (note) {
                _this.notes.push(note);
                _this.cancel();
            }).catch(function () { return alert('error saving'); });
        };
        NotesComponent.prototype.canSave = function () {
            return this.newNote.title !== '' || this.newNote.content !== '';
        };
        NotesComponent.prototype.cancel = function () {
            this.newNote = null;
        };
        return NotesComponent;
    }());
    var NotesComponentConfig = {
        controller: NotesComponent,
        controllerAs: 'vm',
        templateUrl: '/html/notes.html?dd',
        bindings: {
            'notes': '<'
        }
    };
    angular
        .module('component')
        .component('notes', NotesComponentConfig);
})(Component || (Component = {}));
//# sourceMappingURL=notes.js.map