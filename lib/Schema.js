// Need the utils
var utils = require('./utils');

/**
 * vson Schema constructor
 * @param schema
 * @constructor
 */
function Schema(schema) {

    if (schema == null || typeof schema !== 'object') {
        throw new Error("Schema should be an object");
    }

    this.schema = schema;
}

/**
 * Validate a schema's schema
 * @param schema
 * @returns {boolean}
 */
Schema.prototype.validate = function(schema) {

    var self = this;

    // The schema itself
    if (!schema) schema = self.schema;

    /*
     * Types of properties:
     *     1. Only the type
     *     2. An object with type & options
     *     3. An object without a type (virtual)
     *     4. An array (child-schema)
     */

    // Iterating each property
    for (var key in schema) {

        if (schema.hasOwnProperty(key)) {

            // Getting the property
            var prop = schema[key];

            // Property cannot be null TODO: Future, maybe?
            if (prop === null) throw new Error('Property ' + key + ' is null');

            // First check: if it is an object
            if (typeof prop === 'object') {

                // There are two options here: if the property contains
                // a valid 'type' child, so it is a valid property. If not, it
                // should be a virtual

                // Check if has a type
                if (prop.type) {

                    // If the type is an object, so it is
                    // basically a virtual
                    if (typeof prop.type === 'object') {

                        // Re-validate this property
                        self.validate(prop);
                    }
                    else {

                        // 'type' is not an object, which means the property
                        // is a definition
                        if (!utils.isValidType(prop.type)) throw new Error('Property ' + key + ' has no valid type');
                        if (!utils.isValidDefinition(prop)) throw new Error('Property ' + key + ' is not a valid definition');
                    }
                }
                else {

                    // It's a virtual, re-validate it
                    self.validate(prop);
                }
            }
            else {

                // If its an array (child-schema)
                if (prop.constructor === Array){
                    self.validate(prop[0]);
                }
                else {
                    // Just an type. hah.
                    if (!utils.isValidType(prop)) throw new Error('Property ' + key + ' is no valid type');
                }
            }
        }
    }

    return true;
};

/**
 * Export it
 * @type {Schema}
 */
module.exports = Schema;