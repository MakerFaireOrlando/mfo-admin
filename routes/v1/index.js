'use strict'

var v1 = function(){
  var Schedule = require('./schedule/index')
  var Dates = require('./dates/index')
  var r = require('koa-router')()
  r.get('/', function *(next){
    this.body =
      { active: true
      , timestamp: new Date().getTime()
      }
  })

  /*
   * Schedule
   */
  r.post('/schedule', Schedule.create)
  r.get('/schedule', Schedule.all)
  r.get('/schedule/:year', Schedule.byYear)

  /**
   * Dates
   */
  r.get('/dates/:year', Dates.byYear)

  // Return Router
  return r
}

module.exports = v1
