/**
 * Export Everything
 * @type {exports|module.exports}
 */
 var Schema = require('./lib/Schema');
 var Validator = require('./lib/Validator');

module.exports = {
    Schema: Schema,
    Validator: Validator
};
