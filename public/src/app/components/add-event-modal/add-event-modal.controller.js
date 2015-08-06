/* globals moment:flase */
class AddEventModalCtrl {
  constructor($modalInstance, Schedule, day ,dates) {
    'ngInject'
    var vm = this
    this.$modalInstance = $modalInstance;
    this.Schedule = Schedule
    this.dates = dates
    this.day = day
    this.faire_year = new Date().getFullYear()
    this.event = {}
    dates
      .$promise
      .then(function(res){
        vm.dates = res
      })

    function genTimes() {
      var times = [];
      var start = moment("01/01/2015 10:00:00")
      var done = false;
      times.push(start.format("h:mm A"))
      while(!done) {
        start.add('m', 30)
        times.push(new moment(start).format("h:mm A"))
        if(times[times.length - 1] === '6:00 PM') {
          done = true
        }
      }
      return times
    }
    this.times = genTimes()
  }
  save() {
    this.event.meta = {}
    this.event.meta.day = this.day
    this.event.meta.year = this.faire_year
    var item = new this.Schedule.resource(this.event)
    item.$save();
    this.event = {};
  }
  close(msg) {
    this.$modalInstance.close(msg)
  }
  dismiss() {
    this.$modalInstance.dismiss()
  }
}

export default AddEventModalCtrl;
