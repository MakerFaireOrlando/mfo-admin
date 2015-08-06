class MainCtrl {
  constructor (Schedule, $modal, $timeout, $q, DateService) {
    'ngInject';
    var vm = this
    this.creationDate = 1438756090628
    this.$modal = $modal
    this.$timeout = $timeout
    this.$q = $q
    this.DateService = DateService
    var year = new Date().getFullYear()
    Schedule
      .get(year)
      .$promise
      .then(function(res){
        vm.schedule = res
      })
  }
  showAddModal(day) {
    var $q = this.$q
    var DateService = this.DateService
    console.log('day: ', day)
    this.$modal.open({
      animation: true,
      templateUrl: '/app/components/add-event-modal/add-event-modal.html',
      controller: 'AddEventModalCtrl',
      controllerAs: 'vm',
      size: 'lg',
      resolve: {
        day: function() {
          return day
        },
        dates: function(){
          var deferred = $q.defer();
          var promise = deferred.promise;
          var year = new Date().getFullYear();
          DateService
            .get(year)
            .$promise
            .then(function(res){
              deferred.resolve(res)
            })
          return promise;
        }
      }
    })
  }
}

export default MainCtrl
