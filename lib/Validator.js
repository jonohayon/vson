var Schema = require('./Schema');
var utils = require('./utils');

/**
 * vson Validator constructor
 * @param schema
 * @param options
 * @constructor
 */
function Validator(schema, options) {

    // Check if we got a Schema
    if (schema == null || !(schema instanceof Schema)) {
        throw Error('Parameter "Schema" is required');
    }

    // Validate the schema first
    if (!schema.validate(null)) {
        throw Error('Schema is not valid');
    }

    // They're all mine
    this.schema = schema;
    this.options = utils.parseOptions(options || {});
}

/**
 * Export it
 * @type {Validator}
 */
module.exports = Validator;
