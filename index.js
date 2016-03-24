/**
 * Export Everything
 * @type {exports|module.exports}
 */
var Schema = require('./lib/Schema');
var model = require('./lib/model');

module.exports = {
    Schema: Schema,
    model: model
};