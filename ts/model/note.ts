module NoteModel {

  import IQService = angular.IQService;
  import IPromise = angular.IPromise;
  import ITimeoutService = angular.ITimeoutService;

  export interface INote {
    id: number;
    title: string;
    content: string;
    status : string;
    selected?: boolean;
  }

  export class Note {

    constructor(private $q: IQService, private $timeout: ITimeoutService) {}

    public getList() { /* : IPromise<INote[]> */
      const list: INote[] = [
        {
          "id": 1,
          "title": "delectus aut autem",
          "content": "Lorem ipsum",
          "status": "New"
        },
        {
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "content": "Lorem ipsum",
          "status": "Completed"
        },
        {
          "id": 3,
          "title": "fugiat veniam minus",
          "content": "Lorem ipsum",
          "status": "Not completed"
        }
      ];

      const deferred = this.$q.defer();
      this.$timeout(() => deferred.resolve(list), 2000);

      return deferred.promise;
    }
  }

  angular
    .module('model', [])
    .service('Note', Note);
}
