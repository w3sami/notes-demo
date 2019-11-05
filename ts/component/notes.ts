namespace Component {
  import IComponentOptions = angular.IComponentOptions;
  import INote = NoteModel.INote;

  class NotesComponent {
    public notes: INote[];
    public newNote: INote = null;
    public orderBy = 'id';
    public selectedRow: INote;

    constructor(private Note) {}

    public selectRow(note: INote) {
      this.selectedRow = note.selected ? null : note;
    }

    public toggleAll() {}

    public add() {
      this.newNote = this.Note.newNote();
    }

    public save(note: INote) {
      this.Note.saveNote(note)
        .then((note: INote) => {
          this.notes.push(note);
          this.notes = angular.copy(this.notes); // trigger $onChanges
          this.cancelSave();
        })
        .catch(() => alert('error saving'));
    }

    public canSave(): boolean {
      return this.newNote.title !== '' || this.newNote.content !== '';
    }

    public cancelSave() {
      this.newNote = null;
    }

    public remove() {
      // TODO: fake ajax
      let index,
        i = 0;
      angular.forEach(this.notes, note => {
        if (note.id === this.selectedRow.id) {
          index = i;
        }
        i++;
      });
      if (index === undefined) {
        return;
      }
      this.notes.splice(index, 1);
      this.notes = angular.copy(this.notes); // trigger $onChanges
      this.selectedRow = null;
    }

    public cancelRemove() {
      this.selectedRow.selected = false;
      this.selectedRow = null;
    }

    public sort(by: string) {
      if (this.orderBy === by) {
        this.orderBy = '-' + by;
      } else {
        this.orderBy = by;
      }
    }
  }

  const NotesComponentConfig: IComponentOptions = {
    controller: NotesComponent,
    controllerAs: 'vm',
    templateUrl: 'html/notes.html',
    bindings: {
      notes: '=',
    },
  };

  angular.module('component').component('notes', NotesComponentConfig);
}
