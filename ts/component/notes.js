var Component;
(function (Component) {
    var NotesComponent = /** @class */ (function () {
        function NotesComponent() {
        }
        NotesComponent.prototype.selectRow = function (note) {
            console.log(note.selected);
        };
        NotesComponent.prototype.toggleAll = function () {
        };
        NotesComponent.prototype.add = function () {
        };
        return NotesComponent;
    }());
    var NotesComponentConfig = {
        controller: NotesComponent,
        controllerAs: 'vm',
        templateUrl: '/html/notes.html',
        bindings: {
            'notes': '<'
        }
    };
    angular
        .module('component', [])
        .component('notes', NotesComponentConfig);
})(Component || (Component = {}));
//# sourceMappingURL=notes.js.map