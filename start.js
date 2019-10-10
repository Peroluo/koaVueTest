require('babel-core/register')()
require('babel-polyfill')
require('./services/index')

console.log('env: ', process.env.NODE_ENV)
