module Controller {

    import INote = NoteModel.INote;

    class NotesController {

        public notes: INote[];

        constructor(Note) {
            Note.getList().then((notes: INote[]) => {
                this.notes = notes;
            });
        }
    }

    angular
        .module('controller', ['model'])
        .controller('NotesController', NotesController);
}


