// Stuff
var vSchema = require('./Schema');
var defaults = require('./defaults');
var utils = require('./utils');

/**
 * vson model
 * @param {Schema} Schema
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

        /**
         * Validate an object
         * @param {object} obj
         * @param {function} callback
         */
        validate: function(obj, callback) {

            // Do that
            callback = callback || function() {};

            // And that
            var schema = arguments[3] || Schema.getSchema();

            /*
             * What to do:
             *     1. Check every property of the given object.
             *        If one of the object's properties is not following
             *        the schema, so fire-up the callback with an error.
             *     2. Check every property of the schema. Do the
             *        same thing on top.
             */

            // Looping the object
            for (var oKey in obj) {

                // Check if we have that key in out schema
                if (schema.hasOwnProperty(oKey)) {

                    // We have a match, now confirm
                    if (typeof obj[oKey] == typeof schema[oKey]) {

                       
                    }
                }
                else {

                    // Fire-up the callback with an error if needed
                    if (!options.allowExtras) {
                        callback('Property ' + oKey + ' is not allowed in object');
                        return;
                    }
                }

                // Now looping the schema
                for (var sKey in schema) {

                    // Check if we have both keys

                }
            }

            // No errors!
            callback(null);
        }
    }
}

/**
 * Export it
 * @type {model}
 */
module.exports = model;