module Component {

    import IComponentOptions = angular.IComponentOptions;
    import INote = NoteModel.INote;

    class NotesComponent {

        public selectRow(note: INote) {
            console.log( note.selected);
        }

        public toggleAll() {

        }

        public add() {

        }
    }

    const NotesComponentConfig : IComponentOptions = {
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
}
