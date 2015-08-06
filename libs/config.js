'use strict'

var config =
{ app:
  { host: process.env.APP_HOST || '0.0.0.0'
  , port: process.env.APP_PORT || 8886
  , namespace: process.env.APP_NS || '/api'
  }
}

module.exports = config
