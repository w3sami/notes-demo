namespace NoteModel {
  import IQService = angular.IQService;
  import IPromise = angular.IPromise;
  import ITimeoutService = angular.ITimeoutService;

  export interface INote {
    id?: number;
    title: string;
    content: string;
    status: string;
    selected?: boolean;
  }

  export class Note {
    constructor(private $q: IQService, private $timeout: ITimeoutService) {}
    private index = 3;

    public saveNote(note: INote): IPromise<INote> {
      note.id = ++this.index;

      const deferred = this.$q.defer();
      this.$timeout(() => deferred.resolve(note), 2);

      return deferred.promise as IPromise<INote>;
    }

    public newNote(): INote {
      const statuses = ['New', 'Completed', 'Not completed'];
      return {
        title: '',
        content: '',
        // status: 'new'
        status: statuses[Math.floor(Math.random() * statuses.length)], // random to demo the counter feature
      };
    }

    public getList(): IPromise<INote[]> {
      const list: INote[] = [
        {
          id: 1,
          title: 'delectus aut autem',
          content: 'Lorem ipsum',
          status: 'New',
        },
        {
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          content: 'Lorem ipsum',
          status: 'Completed',
        },
        {
          id: 3,
          title: 'fugiat veniam minus',
          content: 'Lorem ipsum',
          status: 'Not completed',
        },
      ];

      const deferred = this.$q.defer();
      this.$timeout(() => deferred.resolve(list), 2);

      return deferred.promise as IPromise<INote[]>;
    }
  }

  angular.module('model').service('Note', Note);
}
