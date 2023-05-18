/**
 * logger.js - Logging helper
 */

var fs = require('fs'),
  colors = require('colors'),
  cluster = require('cluster'),
  tracer = require('tracer');

var logger = tracer.colorConsole({
  format: [
    '[{{timestamp}}] - [{{title}}] ({{path}}:{{line}}) => {{message}}',
    {
      //info: '[{{timestamp}}] -  ({{path}}:{{line}}) ==>  [{{title}}] => {{message}}'
      info: '[{{timestamp}}] -  [{{title}}] => {{message}}'
    }
  ],
  filters: [
    {
      warn: colors.yellow,
      error: colors.red.bold,
      info: colors.green,
      debug: colors.cyan
    }
  ],
  dateformat: 'ddd mmm dd yyyy h:MM:ss TT'
});

module.exports = logger;

//logger.error(err);
//logger.info('Connected ');
//logger.warn('Trying to reconnect ');
