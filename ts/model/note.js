var NoteModel;
(function (NoteModel) {
    var Note = /** @class */ (function () {
        function Note($q, $timeout) {
            this.$q = $q;
            this.$timeout = $timeout;
        }
        Note.prototype.getList = function () {
            var list = [
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
            var deferred = this.$q.defer();
            this.$timeout(function () { return deferred.resolve(list); }, 2000);
            return deferred.promise;
        };
        return Note;
    }());
    NoteModel.Note = Note;
    angular
        .module('model', [])
        .service('Note', Note);
})(NoteModel || (NoteModel = {}));
//# sourceMappingURL=note.js.map