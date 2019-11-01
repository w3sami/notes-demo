var Controller;
(function (Controller) {
    var NotesController = /** @class */ (function () {
        function NotesController(Note) {
            var _this = this;
            Note.getList().then(function (notes) {
                _this.notes = notes;
            });
        }
        return NotesController;
    }());
    angular
        .module('controller', ['model'])
        .controller('NotesController', NotesController);
})(Controller || (Controller = {}));
//# sourceMappingURL=notesController.js.map