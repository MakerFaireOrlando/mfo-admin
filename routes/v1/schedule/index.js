'use strict'
var fs = require('fs')

module.exports =
{ create: create
, all: all
, byYear: byYear
}

/**
 * Get all schedule items
 * @public
 * @returns {null}
 */
function *all() {
  try {
    var data = fs.readFileSync(__dirname + '/schedule.json')
    this.body = JSON.parse(data)
  } catch(e) {
    console.error("Error - Get Dates: ", e.stack || e)
    this.body = {error: true, msg: 'Could not retrieve data'}
  }
}

function *byYear(){
  var year = this.params.year
  try {
    var data = fs.readFileSync(__dirname + '/schedule.json')
    data = JSON.parse(data)
    var years = data.filter(function(item){
      if(item.faire_year === year) {
        return true
      }
      return false
    })
    this.body = years[0]
  } catch(e) {
    console.error("Error - Get Dates: ", e.stack || e)
    this.body = {error: true, msg: 'Could not retrieve data'}
  }
}

function *create() {
  var body = this.request.body;
  var meta = JSON.parse(JSON.stringify(body.meta));
  delete body.meta;
  try {
    var data = fs.readFileSync(__dirname + '/schedule.json')
    data = JSON.parse(data)
    data = data.map(function(year){
      if(year.faire_year != meta.year) {
        return year
      }
      year.days = year.days.map(function(day){
        if(day.date_title !== meta.day) {
          return day
        }
        if(body) {
          day.events.push(body);
        }
        return day
      })
      return year
    })
    fs.writeFileSync(__dirname + '/schedule.json', JSON.stringify(data, null, 2))
    this.body = {success: true}
  } catch(e) {
    console.error("Error - Create Event: ", e.stack || e)
    this.body = {error: true, msg: 'Could not add event'}
  }
}
