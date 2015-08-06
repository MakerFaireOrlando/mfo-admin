'use strict'

var koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    config = require('./libs/config'),
    routes = require('./routes/index'),
    common = require('koa-common'),
    app = koa()

// X-Response-Time
app.use(function *(next){
  var start = new Date
  yield next
  var ms = new Date - start
  this.set('X-Response-Time', ms + 'ms')
})

// Logger
app.use(function *(next){
  var start = new Date
  yield next
  var ms = new Date - start
  console
  .log
  ( '%s - %s %s - %s - %s ms'
  , start.toUTCString()
  , this.method
  , this.url
  , this.status
  , ms
  )
})

// Body
app.use(bodyParser({
  onerror: function(err, ctx) {
    ctx.throw('Improper JSON', 422)
  }
}))

// Static Middleware
app.use(common.static(__dirname + '/public/dist'))

// Error Handling
app.use(function *(next){
  try {
    yield next
  } catch(e) {
    console.error(e.stack || e)
    this.status = e.status || 500
    this.body = {error: true, msg: e.toString()}
    this.app.emit('Error: ', e, this)
  }
})

// Endpoints
app.use(routes().routes())

app.listen(config.app.port, config.app.host, function() {
  console.log('Listening on http://%s:%s', config.app.host, config.app.port)
})
