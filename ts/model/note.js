var NoteModel;
(function (NoteModel) {
    var Note = /** @class */ (function () {
        function Note($q, $timeout) {
            this.$q = $q;
            this.$timeout = $timeout;
            this.index = 3;
        }
        Note.prototype.saveNote = function (note) {
            note.id = ++this.index;
            var deferred = this.$q.defer();
            this.$timeout(function () { return deferred.resolve(note); }, 2);
            return deferred.promise;
        };
        Note.prototype.newNote = function () {
            var statuses = ['New', 'Completed', 'Not completed'];
            return {
                title: '',
                content: '',
                // status: 'new'
                status: statuses[Math.floor(Math.random() * statuses.length)],
            };
        };
        Note.prototype.getList = function () {
            var list = [
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
            var deferred = this.$q.defer();
            this.$timeout(function () { return deferred.resolve(list); }, 2000);
            return deferred.promise;
        };
        return Note;
    }());
    NoteModel.Note = Note;
    angular.module('model').service('Note', Note);
})(NoteModel || (NoteModel = {}));
//# sourceMappingURL=note.js.map