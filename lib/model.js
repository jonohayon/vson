// Stuff
var vSchema = require('./Schema');
var defaults = require('./defaults');
var utils = require('./utils');

/**
 * vson model
 * @param Schema
 * @param options
 */
function model(Schema, options) {

    // Check if we got a Schema
    if (Schema == null || !(Schema instanceof vSchema)) {
        throw Error('Parameter "Schema" is required');
    }

    // Validate the schema first
    if (!Schema.validate(null)) {
        throw Error('Schema is not valid');
    }

    // Parse options
    options = utils.parseOptions(options || {});

    return {

        validate: function(obj, callback) {

        }
    }
}

/**
 * Export it
 * @type {model}
 */
module.exports = model;