const Schema = require('./Schema');
const { parseOptions } = require('./utils');

/**
 * vson Validator constructor
 * @param schema
 * @param options
 * @constructor
 */
class Validator {
    constructor (schema, options) {
        // Check if we got a Schema
        if (schema == null || !(schema instanceof Schema)) throw new Error('Parameter "Schema" is required');

        // Validate the schema first
        if (!schema.validate(null)) throw Error('Schema is not valid');

        // They're all mine
        this.schema = schema;
        this.options = parseOptions(options || {});
    }
}

/**
 * Export it
 * @type {Validator}
 */
module.exports = Validator;
