module Component {

    import IComponentOptions = angular.IComponentOptions;
    import INote = NoteModel.INote;

    class NotesComponent {

        public notes: INote[];
        public newNote: INote = null;

        constructor(private Note) {}

        public selectRow(note: INote) {
            console.log( note.selected);
        }

        public toggleAll() {

        }

        public add() {
            this.newNote = this.Note.newNote();
        }

        public save(note: INote) {
            this.Note.saveNote(note).then((note: INote) => {
                this.notes.push(note);
                this.cancel();
            }).catch(() => alert('error saving'));
        }

        public canSave(): boolean {
            return this.newNote.title !== '' || this.newNote.content !== '';
        }

        public cancel() {
             this.newNote = null;
        }
    }

    const NotesComponentConfig : IComponentOptions = {
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
}
