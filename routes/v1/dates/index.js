'use strict'
var fs = require('fs')

module.exports =
{ byYear: byYear
}

/**
 * Get Schedule Dates By Year
 * @public
 * @returns {null}
 */
function *byYear(){
  var year = this.params.year
  try {
    var data = fs.readFileSync(__dirname + '/../schedule/schedule.json')
    data = JSON.parse(data)
    var d = data.map(function(item){
      if(item.faire_year === year) {
        var dates = item.days.map(function(day){
          console.log(day.date_title)
          return day.date_title;
        })
        console.log('Dates: ', dates)
        return dates;
      }
    })
    this.body = d[0]
  } catch(e) {
    console.error("Error - Get Schedule: ", e.stack || e)
    this.body = {error: true, msg: 'Could not retrieve data'}
  }

}
