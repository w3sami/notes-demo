namespace Component {
  import IComponentOptions = angular.IComponentOptions;
  import INote = NoteModel.INote;

  class StatisticsController {
    public notes: INote[];
    public total: number;
    public completed: number;
    public notCompleted: number;

    public $onChanges(changes) {
      this.total = changes.notes.currentValue.length;
      this.completed = 0;
      this.notCompleted = 0;
      angular.forEach(changes.notes.currentValue, note => {
        this.completed += note.status === 'Completed' ? 1 : 0;
        this.notCompleted += note.status === 'Not completed' ? 1 : 0;
      });
    }
  }

  const StatisticsControllerConfig: IComponentOptions = {
    controller: StatisticsController,
    controllerAs: 'vm',
    templateUrl: 'html/statistics.html',
    bindings: {
      notes: '<',
    },
  };

  angular
    .module('component')
    .component('statistics', StatisticsControllerConfig);
}
