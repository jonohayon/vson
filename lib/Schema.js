// Need the utils
const { isObject, isValidType, isValidDefinition } = require('./utils');

class Schema {
    /**
     * vson Schema constructor
     * @param schema
     * @constructor
     */
    constructor (schema) {
        // Ye. Do that.
        if (schema == null || typeof schema !== 'object') throw new Error('Schema should be an object');

        // Setting the properties
        this.schema = schema;
    }

    /**
     * Validate a schema's schema
     * @param schema
     * @returns {boolean}
     */
    validate (schema) {
        // I love scoping!
        const self = this;

        // The schema itself
        if (!schema) schema = self.schema;

        /*
         * Types of properties:
         *     1. Only the type
         *     2. Array of types
         *     2. A definition
         *     3. An object without a type (virtual)
         *     4. An array (child-schema)
         */

        // Iterating each property
        for (let key in schema) {

            // Safety
            if (schema.hasOwnProperty(key)) {

                // Getting the property
                const prop = schema[key];

                // Property cannot be null
                if (prop === null || prop === 'undefined') throw Error('Property ' + key + ' is null');

                // First check: if it is an object
                if (isObject(prop)) {

                    // There are two possibilities here: if the property contains
                    // a valid 'type' child, so it is a valid property. If not, it
                    // should be a virtual

                    // Check if has a type
                    if (prop.type) {

                        // If the type is an object, so it is
                        // basically a virtual
                        if (isObject(prop.type)) {
                            // Re-validate this property
                            self.validate(prop.type);
                        } else {
                            // 'type' is not an object, which means the property
                            // should be a definition
                            if (!isValidType(prop.type)) throw Error('Property ' + key + ' has no valid type');
                            if (!isValidDefinition(prop)) throw Error('Property ' + key + ' has not a valid definition');
                        }
                    } else {
                        // It's a virtual, re-validate it
                        self.validate(prop);
                    }
                } else {
                    // If its an array (embedded)
                    if (Array.isArray(prop)) {
                        // Check if it's an object
                        if (isObject(prop[0])) {
                            // It's an object! Which means it's
                            // should be an embedded schema
                            self.validate(prop[0]);
                        }
                    } else {
                        // Just a type. hah.
                        if (!isValidType(prop)) throw Error('Property ' + key + ' has no valid type');
                    }
                }
            }
        }

        // k we good
        return true;
    }

    /**
     * Returns the schema object
     * @returns {*}
     */
    getSchema () { return this.schema; }
}

/**
 * Export it
 * @type {Schema}
 */
module.exports = Schema;
